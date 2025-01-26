import cv2
import mediapipe as mp
import pandas as pd
import tensorflow as tf
import numpy as np
from tensorflow.keras.layers import TFSMLayer

# Initialize MediaPipe Hand Landmark model
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)

# Initialize ASL model
model = tf.keras.Sequential([
    TFSMLayer("asl_model", call_endpoint="serving_default")  # Adjust `call_endpoint` if needed
])
curr_word = ""

# Exclude i and j because they are non-static letters, p and q because Anthony cannot physically do them right (yikes)
labels = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y"]

# Start video stream
cap = cv2.VideoCapture(0)


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
    right = []
    if results.multi_hand_landmarks:

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

                    if hand_label == "Right":
                        right.append(landmark.x)
                        right.append(landmark.y)

                    # Display landmark ID number next to the landmark point
                    cv2.putText(frame, str(id), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)


    if len(right) >= 42:
        new_right = np.array(right[:42]).reshape(1, -1)
        predictions = model.predict(new_right)

        predictions = list(predictions.values())[0]
        predicted_class = np.argmax(predictions)
        #confidence = predictions[predicted_class]

        #if confidence > 0.7:
        curr_word = labels[predicted_class]
        #else:
        #    curr_word = ""

        cv2.putText(frame, f"Word: {curr_word},", (10, 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
        print(f"Predicted Word: {labels[predicted_class]} Predicted Class: {predicted_class}, Predictions: {predictions}")

    # Display window
    cv2.imshow('Hand Landmarks', frame)

    # Exit condition
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video stream and close all windows
cap.release()
cv2.destroyAllWindows()
