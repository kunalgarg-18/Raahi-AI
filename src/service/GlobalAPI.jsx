import axios from "axios"

const BASE_URL = "https://places.googleapis.com/v1/places:searchText"

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
  }
}

export const GetPlaceDetails = (query) => {
console.log("🔥 Sending query:", query);
  return axios.post(BASE_URL, {
    textQuery: query
  }, config)
}


export const PHOTO_REF_URL = (name) =>
  `https://places.googleapis.com/v1/${name}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;