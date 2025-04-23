from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut

def get_location(ip_address):
    try:
        geolocator = Nominatim(user_agent="my_app")
        location = geolocator.geocode(ip_address)
        return location
    except GeocoderTimedOut:
        print("Geocoding service timed out. Please try again later.")
        return None

if __name__ == "__main__":
    ip_address = input("Enter the IP address: ")
    location = get_location(ip_address)
    if location:
        print("Location:", location.address)
    else:
        print("Location not found.")
