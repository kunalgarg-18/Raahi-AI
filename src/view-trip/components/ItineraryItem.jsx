import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItineraryItem = ({ place, trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const placeName = place?.placeName;

    if (!placeName) return;

    fetchPlacePhoto(placeName);
  }, [place]);

  const fetchPlacePhoto = async (query) => {
    try {
      console.log("🔥 Itinerary query:", query);

      const res = await GetPlaceDetails(query);

      console.log("🔥 Itinerary API response:", res?.data);

      const placeData = res?.data?.places?.[0];
      const photoRef = placeData?.photos?.[0]?.name;

      if (!photoRef) {
        console.warn("⚠️ No photo found for:", query);
        return;
      }

      const url = PHOTO_REF_URL(photoRef);
      setPhotoUrl(url);

    } catch (err) {
      console.error("❌ Itinerary API error:", err?.response?.data || err);
    }
  };

  return (
    <Link
      className="text-black hover:text-black"
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}, ${trip?.userSelection?.location?.label}`}
      target="_blank"
    >
      <div className="border rounded-xl p-2 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        
        <img
          src={photoUrl || 'placeholder.jpg'}
          className="w-[125px] h-[125px] rounded-xl object-cover"
          alt="Place"
        />

        <div>
          <h2 className="font-bold text-lg">
            {place?.placeName || "Unknown Place"}
          </h2>

          <p className="text-sm text-gray-500">
            {place?.placeDetails || "No details available"}
          </p>

          <h2 className="mt-2">
            🕛 {place?.timeToTravel || "N/A"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ItineraryItem;