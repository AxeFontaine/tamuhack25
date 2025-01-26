import cv2
import mediapipe as mp
import pandas as pd
import tensorflow as tf
import numpy as np
from flask import Flask, Response, jsonify
from tensorflow.keras.layers import TFSMLayer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize MediaPipe Hand Landmark model
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Initialize ASL model (replace with your model path)
model = tf.keras.Sequential(
    [
        TFSMLayer(
            "asl_model", call_endpoint="serving_default"
        )  # Adjust `call_endpoint` if needed
    ]
)
curr_word = ""  # Current predicted word

# Exclude i and j because they are non-static letters, p and q due to limitations
labels = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
]

# Initialize video capture
cap = cv2.VideoCapture(0)


def generate_frames():
    global curr_word

    while True:
        fps = cap.get(cv2.CAP_PROP_FPS)

        # Attempt to read frame from the video stream
        ret, frame = cap.read()
        if not ret:
            break

        # Convert frame to RGB and process it with MediaPipe Hand Landmark model
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = cv2.flip(frame, 1)
        results = hands.process(frame)

        # Draw landmarks and make predictions if landmarks are detected
        right = []
        if results.multi_hand_landmarks:
            has_missing_hand = len(results.multi_hand_landmarks) != 2

            for hand_landmarks, handedness in zip(
                results.multi_hand_landmarks, results.multi_handedness
            ):
                if hand_landmarks:
                    # Get handedness (left or right)
                    hand_label = handedness.classification[0].label
                    color = (0, 0, 0)
                    if hand_label == "Left":
                        color = (255, 0, 0)
                    elif hand_label == "Right":
                        color = (0, 0, 255)

                # Draw the landmarks
                for id, landmark in enumerate(hand_landmarks.landmark):
                    x, y = int(landmark.x * frame.shape[1]), int(
                        landmark.y * frame.shape[0]
                    )
                    z = landmark.z
                    cv2.circle(frame, (x, y), 7, color, -1)

                    if hand_label == "Right":
                        right.append(landmark.x)
                        right.append(landmark.y)

                    # Display landmark ID number next to the landmark point
                    cv2.putText(
                        frame,
                        str(id),
                        (x, y),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.5,
                        (255, 255, 255),
                        1,
                        cv2.LINE_AA,
                    )

        # Make predictions if sufficient landmarks are available
        if len(right) >= 42:
            new_right = np.array(right[:42]).reshape(1, -1)
            predictions = model.predict(new_right)

            predictions = list(predictions.values())[0]
            predicted_class = np.argmax(predictions)
            curr_word = labels[predicted_class]

        # Add the predicted word to the frame
        cv2.putText(
            frame,
            f"Word: {curr_word}",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (255, 255, 255),
            2,
            cv2.LINE_AA,
        )

        # Convert frame back to BGR for OpenCV
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        # Encode the frame as JPEG
        _, buffer = cv2.imencode(".jpg", frame)
        frame = buffer.tobytes()

        # Yield the frame as an MJPEG stream
        yield (b"--frame\r\nContent-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")


@app.route("/video_feed")
def video_feed():
    """Video streaming route."""
    return Response(
        generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame"
    )


@app.route("/curr_word")
def get_current_word():
    """Endpoint to fetch the current word."""
    return jsonify({"curr_word": curr_word})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
