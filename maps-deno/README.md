# Maps with Deno

## Requirements
* Have Deno Installed, if you don't have it [here are the instructions](https://deno.land/manual/getting_started/installation "Deno installation instructions")

## Setup

1. Go to Google Cloud Platform and creates and API Key With Enabling Google Maps JS for the API Key, Places and Geocoding API [this video explains it better](https://www.youtube.com/watch?v=n1UorU1PALk "Youtube video about get api key")
2. Creates a file called keys.js
3. Add the next line ```export const GOOGLE_MAPS_KEY = 'API-KEY'``` in keys.js file
4. Run the next command
```
  deno bundle main.js bundle.js
```

## Run
Open index.html in browser or run a server in this folder