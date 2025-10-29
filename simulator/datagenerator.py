import time
import random
import json
import math
import requests

# Constants
CENTER_LAT = 62.7903
CENTER_LON = 22.8406
RADIUS = 0.1

# Generate location data around Seinäjoki center

url = "http://localhost:3001/api/locations"
headers = {"Content-Type": "application/json"}
id = 1

# Parameters for circular route
num_points = 36  # Number of points in the circle (one every 10 degrees)
angle_step = 2 * math.pi / num_points
current_step = 0

while True:
    angle = current_step * angle_step
    latitude = CENTER_LAT + RADIUS * math.sin(angle)
    longitude = CENTER_LON + RADIUS * math.cos(angle)
    location_data = {
        "id": id,
        "latitude": latitude,
        "longitude": longitude
    }
    response = requests.post(url, headers=headers, data=json.dumps(location_data))
    print(f"Sent data: {location_data}, Response: {response.status_code}")
    id += 1
    current_step = (current_step + 1) % num_points  # Loop back to start after full circle
    time.sleep(5)
