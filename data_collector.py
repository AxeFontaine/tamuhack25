import cv2, os
import mediapipe as mp
import pandas as pd
import time

# Initialize MediaPipe Hand Landmark model
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)

# Start video stream
cap = cv2.VideoCapture(0)

# Identify which folder to write data too and make path if needed
data_folder = input("What folder do you want to write to: ")

if not os.path.exists(f"letters/{data_folder}/"):
    os.mkdir(f"letters/{data_folder}/")

# Loop for a minute
file_number = 0
start_time = time.time()

# Start data collection
frames = []

while time.time() - start_time < 60 and file_number < 300:
    # Read frame from the video stream
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame to RGB and process it with MediaPipe Hand Landmark model
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    frame = cv2.flip(frame, 1)
    results = hands.process(frame)

    # Set up filler info
    left = []
    right = []

    # Draw landmarks on the frame if detected
    if results.multi_hand_landmarks:

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

                # Visualize the landmarks
                for id, landmark in enumerate(hand_landmarks.landmark):
                    x, y = int(landmark.x * frame.shape[1]), int(landmark.y * frame.shape[0])
                    cv2.circle(frame, (x, y), 7, color, -1)

                    # Display landmark ID number next to the landmark point
                    cv2.putText(frame, str(id), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)

                    # Save the normalized landmarks
                    if hand_label == "Left":
                        left.append(landmark.x)
                        left.append(landmark.y)
                    elif hand_label == "Right":
                        right.append(landmark.x)
                        right.append(landmark.y)

        # Convert the nested dict to a DataFrame
        data = {"Right": right}
        dataframe = pd.DataFrame.from_dict({i: data[i] for i in data.keys()}, orient='index')
        dataframe.columns = dataframe.columns.astype(str)

        # Save the DataFrame as a parquet file
        dataframe.to_parquet(f"letters/{data_folder}/{data_folder}_{file_number}.parquet")
        file_number += 1

    # Display the frame in a window
    cv2.imshow('Hand Landmarks', frame)

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video stream and close all windows
cap.release()
cv2.destroyAllWindows()