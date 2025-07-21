import requests
import sys
import json

if len(sys.argv) != 2:
    sys.exit()

response = requests.get("https://itunes.apple.com/search?entity=song&limit=20&term=" + sys.argv[1])
# print(json.dumps(response.json(), indent=2))

object=  response.json()
for result in object["results"]:
    print("TrackName: "+ result["trackName"])