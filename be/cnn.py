import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator, img_to_array, load_img
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from sklearn.model_selection import train_test_split
import os

# ----------------------- Data Preparation --------------------------

# List of image paths and corresponding labels
image_paths = [
    r"C:\Users\Sarvadnya\Downloads\A57909 (1).jpg", 
    r"C:\Users\Sarvadnya\Downloads\WhatsApp Image 2024-03-18 at 18.30.38_5a2c6ae2.jpg",
    r"C:\Users\Sarvadnya\Downloads\profile (1).png"
]

# Let's assume all the images belong to the same class for simplicity
labels = [0, 0, 0]  # Replace with actual labels if necessary

# Function to preprocess images
def preprocess_image(image_path):
    img = load_img(image_path, target_size=(128, 128))  # Resize image to 128x128
    img_array = img_to_array(img)
    img_array /= 255.0  # Normalize image
    return img_array

# Preprocess all images
images = np.array([preprocess_image(path) for path in image_paths])
labels = np.array(labels)

# Split the data into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(images, labels, test_size=0.2, random_state=42)

# Reshape the labels for categorical crossentropy (one-hot encoding)
y_train = tf.keras.utils.to_categorical(y_train, num_classes=2)  # Adjust num_classes based on your actual number of classes
y_val = tf.keras.utils.to_categorical(y_val, num_classes=2)

# --------------------- CNN Model Creation ------------------------

def create_cnn_model(num_classes):
    model = Sequential()

    # Convolutional layers
    model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(128, 128, 3)))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Conv2D(64, (3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Conv2D(128, (3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    # Fully connected layers
    model.add(Flatten())
    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.5))

    model.add(Dense(num_classes, activation='softmax'))  # Softmax for multi-class classification

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    return model

# Create the CNN model
num_classes = 2  # Adjust this to the actual number of classes
model = create_cnn_model(num_classes)

# Use ImageDataGenerator for augmenting the training data
train_datagen = ImageDataGenerator(
    rotation_range=20,
    zoom_range=0.15,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.15,
    horizontal_flip=True,
    fill_mode="nearest"
)

# Fit the model on the training data
model.fit(train_datagen.flow(X_train, y_train, batch_size=32),
          validation_data=(X_val, y_val),
          epochs=10)

# ------------------------ Prediction on New Images ------------------------

def predict_faces(model, image_paths):
    for image_path in image_paths:
        img_array = preprocess_image(image_path)
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        prediction = model.predict(img_array)
        predicted_label = np.argmax(prediction)
        confidence_score = np.max(prediction)

        print(f"Image: {image_path}")
        print(f"Predicted Class ID: {predicted_label}, Confidence: {confidence_score:.2f}")

# Predict on your new test images
test_images = [
    r"C:\Users\Sarvadnya\Downloads\A57909 (1).jpg", 
    r"C:\Users\Sarvadnya\Downloads\WhatsApp Image 2024-03-18 at 18.30.38_5a2c6ae2.jpg",
    r"C:\Users\Sarvadnya\Downloads\profile (1).png"
]

predict_faces(model, test_images)
