import cv2
import mediapipe as mp
import pandas as pd
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model

# Initialize MediaPipe Hand Landmark model
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)

# Initialize ASL model
model = load_model("asl_model")
curr_word = ""
labels = ["after", "airplane", "all", "alligator", "animal"]

# Start video stream
cap = cv2.VideoCapture(0)

frames = [[-2] * (42 * 3) for _ in range(40)]



def preprocess_frames(frames):
    """
    Preprocesses the frames to match the model input.
    Args:
        frames: List of 40 frames, each containing 126 features (2 hands, 21 landmarks * 3 coords).
    Returns:
        np.array of shape (1, 40, 126) for prediction.
    """


    # Convert frames to a NumPy array
    frames_np = np.array(frames)

    # Reshape frames to match the model input shape
    frames_np = frames_np.reshape(1, 40, 42 * 3)

    return frames_np


while True:
    # Get the FPS property
    fps = cap.get(cv2.CAP_PROP_FPS)

    print(f"Frames per second: {fps}")
    
    # Attempt to read frame from the video stream
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame to RGB and process it with MediaPipe Hand Landmark model
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    frame = cv2.flip(frame, 1)
    results = hands.process(frame)

    # Draw landmarks on the frame if detected
    left = []
    right = []
    if results.multi_hand_landmarks:
        print(len(left), len(right))

        has_missing_hand = len(results.multi_hand_landmarks) != 2

        # Loop through each hand's landmarks
        for hand_landmarks, handedness in zip(results.multi_hand_landmarks, results.multi_handedness):
            if hand_landmarks:
                # Get the handedness (left or right) for the current hand
                hand_label = handedness.classification[0].label
                color = (0, 0, 0)
                if hand_label == "Left":
                    color = (255, 0, 0)
                elif hand_label == "Right":
                    color = (0, 0, 255)

                # Draw the landmarks
                for id, landmark in enumerate(hand_landmarks.landmark):
                    x, y = int(landmark.x * frame.shape[1]), int(landmark.y * frame.shape[0])
                    z = landmark.z
                    cv2.circle(frame, (x, y), 7, color, -1)

                    # 
                    if hand_label == "Left":
                        left.append(landmark.x)
                        left.append(landmark.y)
                        left.append(landmark.z)
                    elif hand_label == "Right":
                        right.append(landmark.x)
                        right.append(landmark.y)
                        right.append(landmark.z)

                    # Display landmark ID number next to the landmark point
                    cv2.putText(frame, str(id), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)


    # Pad the current frame if values are missing
    while len(left) < 21 * 3:
        left.append(-2)
    while len(right) < 21 * 3:
        right.append(-2)

    # Interweave the left and right hand data
    frame_data = left[:21*3] + right[:21*3]
    print(left)
    print(right)
    print(len(frame_data), len(left), len(right))
    frames.append(frame_data)

    # Remove the oldest frame if there are more than 40 frames
    while len(frames) > 40:
        frames.pop(0)

    preprocessed_frames = preprocess_frames(frames)
    predictions = model.predict(preprocessed_frames)
    predicted_class = np.argmax(predictions, axis=1)
    confidence = predictions[0][predicted_class[0]]

    if confidence > 0.7:
        curr_word = labels[predicted_class[0]]
    else:
        curr_word = ""

    cv2.putText(frame, f"Word: {curr_word}, Confidence: {confidence * 100:.2f}%", (10, 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
    print(f"Predicted Word: {labels[predicted_class[0]]}, Predicted Class: {predicted_class}, Predictions: {predictions}")

    # Display window
    cv2.imshow('Hand Landmarks', frame)

    # Exit condition
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video stream and close all windows
cap.release()
cv2.destroyAllWindows()