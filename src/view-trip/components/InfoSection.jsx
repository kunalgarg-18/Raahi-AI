import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const locationLabel = trip?.userSelection?.location?.label;

    if (!locationLabel) return;

    fetchPlacePhoto(locationLabel);
  }, [trip]);

  const fetchPlacePhoto = async (query) => {
    try {
      console.log("🔥 Location query:", query);

      const res = await GetPlaceDetails(query);

      console.log("🔥 Location API response:", res?.data);

      const place = res?.data?.places?.[0];
      const photoRef = place?.photos?.[0]?.name;

      if (!photoRef) {
        console.warn("⚠️ No photo found for location");
        return;
      }

      const url = PHOTO_REF_URL(photoRef);
      setPhotoUrl(url);

    } catch (err) {
      console.error("❌ Location API error:", err?.response?.data || err);
    }
  };

  return (
    <div>
      <img
        src={photoUrl || "placeholder.jpg"}
        alt="Trip"
        className="h-[350px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center md:flex-row">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label || "Unknown Location"}
          </h2>

          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full text-sm md:text-md">
              📆 {trip?.userSelection?.noOfDays || 0} Days
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full text-sm md:text-md">
              💰 {trip?.userSelection?.budget || "N/A"} Budget
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full text-sm md:text-md">
              🍻 Travellers: {trip?.userSelection?.people || "N/A"}
            </h2>
          </div>
        </div>

        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;