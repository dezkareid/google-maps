# Demo Cloud-based Map Styling

## Setup

1. Install dependencies with yarn or npm
2. Go to Google Cloud Platform and creates and API Key With Enabling Google Maps JS for the API Key, Places and Geocoding API [this video explains it better](https://www.youtube.com/watch?v=n1UorU1PALk "Youtube video about get api key")
3. Create a Map ID, you can look how [here](https://developers.google.com/maps/documentation/javascript/cloud-based-map-styling#create-map-id)
4. Creates a file called keys.js
5. Add the next line ```export const GOOGLE_MAPS_KEY = 'API-KEY'``` in keys.js file
6. Add the next line ```export const GOOGLE_MAP_ID = 'MAP-ID'``` in keys.js file

## Run
Executes the next command to start the project
```
    npm run start
```
or
```
    yarn start
```

Open your browser and go to http://localhost:10001/