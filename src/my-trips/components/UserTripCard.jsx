import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";

function UserTripCard({ trip, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const locationLabel = trip?.userSelection?.location?.label;

    if (!locationLabel) return;

    GetPlacePhoto(locationLabel);
  }, [trip]);

  const GetPlacePhoto = async (query) => {
    try {
      console.log("🔥 Sending query:", query);

      const resp = await GetPlaceDetails(query);

      console.log("🔥 Places response:", resp?.data);

      const place = resp?.data?.places?.[0];
      const photoRef = place?.photos?.[0]?.name;

      if (!photoRef) {
        console.warn("⚠️ No photo found for place");
        return;
      }

      const url = PHOTO_REF_URL(photoRef);
      setPhotoUrl(url);

    } catch (err) {
      console.error("❌ Place API error:", err?.response?.data || err);
    }
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="relative hover:scale-95 transition-all bg-[#F5F5F5] p-4 rounded-xl shadow-lg">

        <img
          src={photoUrl || '/info.jpg'}
          className="object-cover rounded-xl w-full h-[200px] sm:h-[250px] mb-4"
          alt="Trip"
        />

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#364F6B]">
            {trip?.userSelection?.location?.label || "Unknown Location"}
          </h2>

          <h2 className="text-xs sm:text-sm text-[#3FC1C9]">
            {trip?.userSelection?.noOfDays || 0} Days trip with{" "}
            {trip?.userSelection?.budget || "N/A"} budget
          </h2>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete?.();
          }}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          title="Delete Trip"
        >
          <FaTrashAlt size={18} />
        </button>
      </div>
    </Link>
  );
}

export default UserTripCard;