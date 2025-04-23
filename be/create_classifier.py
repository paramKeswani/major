import numpy as np
from PIL import Image
import os, cv2
import face_recognition



# Method to train custom classifier to recognize face
def train_classifier(name):
    # Read all the images in custom data-set
    path = os.path.join(os.getcwd()+"/data/"+name+"/")
    
    pathc  = 'faces'
    images = []
    classNames = []

    faces = []
    ids = []
    labels = []
    pictures = {}

    print("1")


    # Store images in a numpy format and ids of the user on the same index in imageNp and id lists
    for img in os.listdir(pathc):
        image = cv2.imread(f'{pathc}/{img}')
        images.append(image)
        classNames.append(os.path.splitext(img)[0])

    print(classNames)

    print("2")
    for root,dirs,files in os.walk(path):
            pictures = files

#     for img in os.listdir(path):
#         image = cv2.imread(f'{path}/{img}')
#         images.append(image)
#         classNames.append(os.path.splitext(img)[0])

#     print(classNames)    
    scale = 0.25
    box_multiplier = 1/scale


    for pic in pictures :
            

            imgpath = path+pic
            img = Image.open(imgpath).convert('L')
            imageNp = np.array(img, 'uint8')
            id = int(pic.split(name)[0])
            #names[name].append(id)
            faces.append(imageNp)
            ids.append(id)
    print("3")    
    ids = np.array(ids)
    print("images ",images)
    def findEncodings(images):
        encodeList = []
        for img in images:
                try:
                # Convert the image to RGB
                        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                        
                        # Get face encodings
                        encodes = face_recognition.face_encodings(img)
                        
                        # Check if any face encodings are found
                        if encodes:
                                encodeList.append(encodes[0])  # Use the first encoding
                        else:
                                print("[WARNING] No face detected in the image. Skipping...")
                except Exception as e:
                        print(f"[ERROR] Could not process image: {e}")
        print("inside find encoding")
        return encodeList
    knownEncodes = findEncodings(images)

    print("before clf")


    #Train and save classifier
    clf = cv2.face.LBPHFaceRecognizer_create()
    clf.train(faces, ids)
    clf.write("./data/classifiers/"+name+"_classifier.xml")
    print("return")
    return knownEncodes , classNames



# # req  1

# # import numpy as np
# # from PIL import Image
# # import os, cv2
# # import face_recognition


# # # Method to train custom classifier to recognize face
# # def train_classifier(name):
# #     # Read all the images in custom data-set
# #     path = os.path.join(os.getcwd() + "/data/" + name + "/")
# #     images = []
# #     classNames = []

# #     faces = []
# #     ids = []
# #     pictures = {}

# #     # Store images in a numpy format and ids of the user on the same index in imageNp and id lists
# #     for root, dirs, files in os.walk(path):
# #         pictures = files

# #     for img in os.listdir(path):
# #         image = cv2.imread(f'{path}/{img}')
# #         images.append(image)
# #         classNames.append(os.path.splitext(img)[0])

# #     print(classNames)
# #     scale = 0.25
# #     box_multiplier = 1 / scale

# #     for pic in pictures:
# #         imgpath = path + pic
# #         img = Image.open(imgpath).convert('L')
# #         imageNp = np.array(img, 'uint8')
# #         id = int(pic.split(name)[0])
# #         faces.append(imageNp)
# #         ids.append(id)

# #     ids = np.array(ids)

# #     # Function to find encodings for images
# #     def findEncodings(images):
# #         encodeList = []
# #         for img in images:
# #             img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
# #             encode = face_recognition.face_encodings(img)[0]
# #             print(encode)
# #             encodeList.append(encode)
# #         return encodeList

# #     # Generate encodings for the images
# #     knownEncodes = findEncodings(images)
# #     print("Encoding Complete")

# #     # Train and save LBPH classifier
# #     clf = cv2.face.LBPHFaceRecognizer_create()
# #     clf.train(faces, ids)
# #     clf.write(f"./data/classifiers/{name}_classifier.xml")
# #     print(f"LBPH classifier saved to ./data/classifiers/{name}_classifier.xml")

# #     # Return the encodings directly
# #     return knownEncodes


# # req 2

# import re
# import numpy as np
# from PIL import Image
# import os
# import cv2
# import face_recognition

# # Method to train custom classifier to recognize face
# def train_classifier(name):
#     # Read all the images in the custom dataset
#     path = os.path.join(os.getcwd(), "data", name)
    
#     images = []


#     paths = 'faces'
#     imgs = []

#     classNames = []

#     faces = []
#     ids = []
#     pictures = []

#     for img in os.listdir(paths):
#         image = cv2.imread(f'{paths}/{img}')
#         images.append(image)
#         classNames.append(os.path.splitext(img)[0])

#     print(classNames)

#     # Store images in a numpy format and IDs of the user on the same index in imageNp and id lists
#     for root, dirs, files in os.walk(path):
#         pictures = files

#     for img_name in pictures:
#         img_path = os.path.join(path, img_name)
#         try:
#             # Extract numeric ID from the filename using regex
#             match = re.match(r"(\d+)", img_name)
#             if not match:
#                 print(f"[WARNING] Skipped file with invalid format: {img_name}")
#                 continue

#             id = int(match.group(1))  # Extract the numeric part as ID

#             # Load the image
#             image = cv2.imread(img_path)
#             if image is None:
#                 print(f"[WARNING] Skipped unreadable image: {img_name}")
#                 continue

#             # Append to images and classNames
#             images.append(image)
#             classNames.append(os.path.splitext(img_name)[0])

#             # Convert image to grayscale for LBPH
#             img_gray = Image.open(img_path).convert('L')
#             imageNp = np.array(img_gray, 'uint8')

#             faces.append(imageNp)
#             ids.append(id)
#         except Exception as e:
#             print(f"[ERROR] Could not process {img_name}: {e}")

#     if not faces or not ids:
#         raise ValueError("[ERROR] No valid images found for training.")

#     ids = np.array(ids)

#     # Function to find encodings for images
#     def findEncodings(images):
#         encodeList = []
#         for img in images:
#             try:
#                 img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#                 encodes = face_recognition.face_encodings(img_rgb)
#                 if encodes:
#                     encodeList.append(encodes[0])  # Only use the first face
#                 else:
#                     print("[WARNING] No face found in image.")
#             except Exception as e:
#                 print(f"[ERROR] Could not encode image: {e}")
#         return encodeList

#     # Generate encodings for the images
#     knownEncodes = findEncodings(images)
#     if not knownEncodes:
#         raise ValueError("[ERROR] No face encodings generated.")

#     print("[INFO] Encoding Complete")

#     # Train and save LBPH classifier
#     clf = cv2.face.LBPHFaceRecognizer_create()
#     clf.train(faces, ids)
#     classifier_path = f"./data/classifiers/{name}_classifier.xml"
#     clf.write(classifier_path)
#     print(f"[INFO] LBPH classifier saved to {classifier_path}")

#     # Return the encodings directly
#     return knownEncodes