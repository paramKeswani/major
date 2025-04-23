import cv2
from PIL import Image
from geopy.geocoders import Nominatim
import numpy as np
import face_recognition
import os

def main_app(name, latitude, longitude, to_email, knownEncodes, classNames):
    geolocator = Nominatim(user_agent="missing_person_app")

    scale = 0.25
    box_multiplier = 1 / scale
    cap = cv2.VideoCapture(0)

    while True:
        success, img = cap.read()  # Reading each frame
        if not success:
            print("[ERROR] Failed to read from webcam.")
            break

        # Resize the frame
        current_image = cv2.resize(img, (0, 0), None, scale, scale)
        current_image = cv2.cvtColor(current_image, cv2.COLOR_BGR2RGB)

        # Find the face location and encodings for the current frame
        face_locations = face_recognition.face_locations(current_image, model='cnn')  # Use 'hog' for CPU
        face_encodes = face_recognition.face_encodings(current_image, face_locations)

        # Process each detected face
        for encodeFace, faceLocation in zip(face_encodes, face_locations):
            matches = face_recognition.compare_faces(knownEncodes, encodeFace, tolerance=0.6)
            faceDis = face_recognition.face_distance(knownEncodes, encodeFace)

            name = "Unknown"
            if matches and len(faceDis) > 0:
                matchIndex = np.argmin(faceDis)
                if matches[matchIndex]:
                    name = classNames[matchIndex].upper()

            # Scale back up face locations
            y1, x2, y2, x1 = faceLocation
            y1, x2, y2, x1 = int(y1 * box_multiplier), int(x2 * box_multiplier), int(y2 * box_multiplier), int(x1 * box_multiplier)

            # Draw rectangle around detected face
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.rectangle(img, (x1, y2 - 20), (x2, y2), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 0.5, (255, 255, 255), 2)

        # Show the output
        cv2.imshow('Webcam', img)

        if cv2.waitKey(1) == ord('q'):
            break

    # Release the camera object
    cap.release()
    cv2.destroyAllWindows()