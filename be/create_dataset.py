import cv2
import os

def start_capture(name):
        path = "./data/" + name
        num_of_images = 0
        detector = cv2.CascadeClassifier("./data/haarcascade_frontalface_default.xml")
        try:
            os.makedirs(path)
        except:
            print('Directory Already Created')
        vid = cv2.VideoCapture(0)
        count = 0
        while True:

            ret, img = vid.read()
            # success, frame = vid.read()
            new_img = None
            grayimg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            face = detector.detectMultiScale(image=grayimg, scaleFactor=1.1, minNeighbors=5)


            for x, y, w, h in face:
                cv2.rectangle(img, (x, y), (x+w, y+h), (0, 0, 0), 2)
                cv2.putText(img, "Face Detected", (x, y-5), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255))
                cv2.putText(img, str(str(num_of_images)+" images captured"), (x, y+h+20), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255))
                new_img = img[y:y+h, x:x+w]
            cv2.imshow("FaceDetection", img)
            # cv2.imshow("Frame", frame)
            if count == 50 :
                filename = 'faces/'+name+'.jpg'
                cv2.imwrite(filename, img)
                print("Image Saved- ",filename)
                
            key = cv2.waitKey(1) & 0xFF
            count += 1


            try :
                cv2.imwrite(str(path+"/"+str(num_of_images)+name+".jpg"), new_img)
                num_of_images += 1
            except :

                pass
            if key == ord("q") or key == 27 or num_of_images > 310:
                break
        cv2.destroyAllWindows()
        return num_of_images

# def start_capture(name):
#     path = "./data/" + name
#     num_of_images = 0
#     detector = cv2.CascadeClassifier("./data/haarcascade_frontalface_default.xml")
#     try:
#         os.makedirs(path)
#     except FileExistsError:
#         print('Directory Already Created')
#     vid = cv2.VideoCapture(0)
#     while True:
#         ret, img = vid.read()
#         if not ret or img is None:
#             break
#         new_img = None
#         grayimg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#         face = detector.detectMultiScale(image=grayimg, scaleFactor=1.1, minNeighbors=5)
#         for x, y, w, h in face:
#             cv2.rectangle(img, (x, y), (x+w, y+h), (0, 0, 0), 2)
#             cv2.putText(img, "Face Detected", (x, y-5), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255))
#             cv2.putText(img, str(str(num_of_images)+" images captured"), (x, y+h+20), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255))
#             new_img = img[y:y+h, x:x+w]
#         cv2.imshow("FaceDetection", img)
#         key = cv2.waitKey(1) & 0xFF

#         try:
#             cv2.imwrite(str(path+"/"+str(num_of_images)+name+".jpg"), new_img)
#             num_of_images += 1
#         except Exception as e:
#             print("Error saving image:", e)

#         if key == ord("q") or key == 27 or num_of_images > 310:
#             break

#     vid.release()
#     cv2.destroyAllWindows()
#     return num_of_images

# import cv2
# import os

# def start_capture(name):
#     path = "./data/" + name
#     num_of_images = 0
#     detector = cv2.CascadeClassifier("./data/haarcascade_frontalface_default.xml")
#     try:
#         os.makedirs(path)
#     except:
#         print('Directory Already Created')

#     cap = cv2.VideoCapture(0)
#     while True:
#         ret, img = cap.read()
#         grayimg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#         face = detector.detectMultiScale(grayimg, scaleFactor=1.1, minNeighbors=5)
        
#         for x, y, w, h in face:
#             cv2.rectangle(img, (x, y), (x+w, y+h), (0, 0, 0), 2)
#             cv2.putText(img, "Face Detected", (x, y-5), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255))
#             cv2.putText(img, f"{num_of_images} images captured", (x, y+h+20), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255))
#             new_img = img[y:y+h, x:x+w]
        
#         cv2.imshow("FaceDetection", img)
#         key = cv2.waitKey(1) & 0xFF

#         try:
#             cv2.imwrite(f"{path}/{num_of_images}_{name}.jpg", new_img)
#             num_of_images += 1
#         except Exception as e:
#             print("Error saving image:", e)

#         if key == ord("q") or key == 27 or num_of_images > 310:
#             break
    
#     cap.release()
#     cv2.destroyAllWindows()
    
#     return num_of_images

if __name__ == "__main__":
    name = input("Enter the name: ")
    start_capture(name)
