import os
import json
import smtplib
from flask import Flask, request, jsonify
from create_dataset import start_capture
from create_classifier import train_classifier
from Detector import main_app  
from flask_cors import CORS
from geopy.geocoders import Nominatim
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from datetime import datetime
from pymongo import MongoClient
import numpy as np


impKnowEncode = []
cn = []
geolocator = Nominatim(user_agent="my_geocoder")
app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb+srv://abcd:1234@cluster0.2kso0zl.mongodb.net/")
db = client["encode"]
collection = db["encode"]


# def get_location():
#     geolocator = Nominatim(user_agent="my_app")
#     ip_address = request.remote_addr  # Get client's IP address
#     location = geolocator.geocode(ip_address)
#     return location


def send_email(to_email, name, date_of_sighting, aadhaar_number,location):
    sender_email = os.getenv("SENDER_EMAIL")
    sender_password = os.getenv("SENDER_PASSWORD")
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = "Face Recognition Result"

    body = f"Hello,\n\nWe are pleased to inform you that the missing person you were concerned about has been found. The person was located in a camera footage, and we have identified their whereabouts-\n\nHere are the details:\n• Name: {name}\n• Date & Time of Sighting: {date_of_sighting}\n• Location: {location}\n• Aadhaar Number: {aadhaar_number}\n\nWe understand the relief this news must bring to you. If you have any further questions or require more information, please do not hesitate to reach out to us.\n\nThank you for your cooperation and concern in this matter\n\nSincerely,\nTeam Milaap"

    msg.attach(MIMEText(body, 'plain'))

    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(sender_email, 'miom ogmy vwwp hpah')
    server.sendmail(sender_email, to_email, msg.as_string())
    server.quit()

@app.route('/face-recognition', methods=['POST'])
def face_recognition():
    try:
        global impKnowEncode
        global cn
        with open('data.json', 'r') as file:
            data = json.load(file)
        
        latest_entry = data[-1]
        name = latest_entry.get('name')
        email = latest_entry.get('email')
        # date_of_sighting = latest_entry.get('date_of_sighting')
        # date_of_sighting = datetime.now().date()
        date_of_sighting = datetime.now().strftime("%Y-%m-%d & %H:%M:%S")  # Current date and time
        aadhaar_number = latest_entry.get('aadhaarNumber')
        # location = get_location()
        location = "VESIT"
        
        # request_data = request.json
        # latitude = request_data.get('latitude')
        # longitude = request_data.get('longitude')
        latitude = 19.076
        longitude = 72.8777

        
        to_email = email
        print(impKnowEncode)
       
        
        result = main_app(name, latitude, longitude, to_email , impKnowEncode ,cn)

        if result:
            send_email(to_email, name, date_of_sighting, aadhaar_number,location)
            print(f'email sent, name : {result}')
            return jsonify({'message': 'Face recognition completed. Email sent.', 'result': result}), 200
        else:
            return jsonify({'message': 'Face recognition failed :('}), 400 
    except Exception as e:
        print(f"Image found: {e}")
        return jsonify({'error': str(e)}), 500 

data_list = []

@app.route('/add-user', methods=['POST'])
def add_name():
   
    
    try:
        
        data = request.json
        name = data.get('name')
        email = data.get('email')
        phoneNumber = data.get('phoneNumber')
        dob = data.get('dob')
        missingDate = data.get('missingDate')
        aadhaarNumber = data.get('aadhaarNumber')
        
        new_entry = {
            'name': name,
            'email': email,
            'phoneNumber': phoneNumber,
            'dob': dob,
            'missingDate': missingDate,
            'aadhaarNumber': aadhaarNumber
        }
        
        data_list.append(new_entry)
        
        with open('data.json', 'w') as file:
            json.dump(data_list, file)
        
        return jsonify({'message': 'Data added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/capture-dataset', methods=['POST'])
def capture_dataset():
   
    try:
        with open('data.json', 'r') as file:
            data = json.load(file)
            # 
            last_entry = data[-1]
            username = last_entry.get('name')

        num_images = start_capture(username) 

        return jsonify({'message': f'Dataset captured successfully. Number of images: {num_images}'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/train-model', methods=['POST'])
def train_model():
    global impKnowEncode
    global cn
   
    try:
     
        with open('data.json', 'r') as file:
            data = json.load(file)
            last_entry = data[-1]
            username = last_entry.get('name')

        num_images = 310
        if not username:
            return jsonify({'error': 'Username not provided'}), 400

        if num_images < 300:
            return jsonify({'error': 'Not enough data. Capture at least 300 images'}), 400
        print("hello")
        # train_classifier(username)
        collection.delete_many({})
        impKnowEncode , cn = train_classifier(username)


        for a,b in zip(impKnowEncode, cn):
            print("hi")

            req = {
                "name": b ,
                "encode": a.tolist()

            }
            # print("a", a)

            # Insert the data into MongoDB
            collection.insert_one(req)

        # print("hi")



        print("required encoing                    ", impKnowEncode)

        return jsonify({'message': 'Model trained successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Model trained successfully'}), 200

@app.route('/geocode-address')
def geocode_address():
    try:
        address = "Mumbai"
        location = geolocator.geocode(address)
        if location:
            return jsonify({'message': f'Location: {location.latitude}, {location.longitude}'})
        else:
            return jsonify({'error': 'Address not found.'})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/reverse-geocode', methods=['GET'])
def reverse_geocode():
    try:
        latitude = 19.0760
        longitude = 72.8777
        location = geolocator.reverse((latitude, longitude))
        if location:
            return jsonify({'message': f'Address: {location.address}'})
        else:
            return jsonify({'error': 'Coordinates not found.'})
    except Exception as e:
        return jsonify({'error': str(e)})
    


@app.route('/tryy', methods=['GET'])
def tryy():
    return jsonify({'message': 'hi'}), 200

if __name__ == '__main__':
    app.run(debug=True)

