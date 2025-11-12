import json
import requests
import time

url = "http://localhost:3001/api/locations"
headers = {"Content-Type": "application/json"}

# Read file positions.json 
with open("positions.json", "r", encoding="utf-8") as file:
    positions = json.load(file)

# Loop through positions and send each as a POST request
for position in positions:
    location_data = {
        "id": position["time"],
        "latitude": position["lat"],
        "longitude": position["lon"]
    }

    print(location_data)
    response = requests.post(url, headers=headers, data=json.dumps(location_data))
    print(response)
    time.sleep(2)