import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HotelCardItem = ({ item }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const hotelName = item?.hotelName;

    if (!hotelName) return;

    fetchPlacePhoto(hotelName);
  }, [item]);

  const fetchPlacePhoto = async (query) => {
    try {
      console.log("🔥 Hotel query:", query);

      const res = await GetPlaceDetails(query);

      console.log("🔥 Hotel API response:", res?.data);

      const place = res?.data?.places?.[0];
      const photoRef = place?.photos?.[0]?.name;

      if (!photoRef) {
        console.warn("⚠️ No photo found for hotel:", query);
        return;
      }

      const url = PHOTO_REF_URL(photoRef);
      setPhotoUrl(url);

    } catch (err) {
      console.error("❌ Hotel API error:", err?.response?.data || err);
    }
  };

  return (
    <div>
      <Link
        className="text-black hover:text-black"
        to={`https://www.google.com/maps/search/?api=1&query=${item?.hotelName}, ${item?.hotelAddress}`}
        target="_blank"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          
          <img
            src={photoUrl || 'placeholder.jpg'}
            alt="Hotel"
            className="rounded-xl h-[200px] w-full object-cover"
          />

          <div className="flex flex-col gap-2">
            <h2 className="font-medium">
              {item?.hotelName || "Unknown Hotel"}
            </h2>

            <h2 className="text-xs text-gray-500">
              📍 {item?.hotelAddress || "No address"}
            </h2>

            <h2 className="text-sm font-bold text-red-800">
              💰 {item?.price || "N/A"}
            </h2>

            <h2 className="text-xs">
              Rating: {item?.rating || "N/A"} ⭐
            </h2>
          </div>

        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;