import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { PHOTO_REF_URL } from "@/service/GlobalAPI";

const InfoSection = ({ trip }) => {
    const [photoUrl, setPhotoUrl] = useState();
    const GetPlacePhoto = async() => {
        const data = {
            textQuery: trip?.userSelection?.location?.label.toString()
        }
        const result = await GetPlaceDetails(data).then(res => {
            console.log(res.data.places[0].photos[3].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl)
    
        })
    }

    useEffect(() => {
        trip&&GetPlacePhoto()
    },[trip])
  return (
    <div>
      <img
        src={photoUrl?photoUrl:'placeholder.jpg'}
        alt=""
        className="h-[350px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center md:flex-row">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full text-sm md:text-md">
              📆{trip.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full text-sm md:text-md">
              {" "}
              💰{trip.userSelection?.budget} Budget{" "}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full text-sm md:text-md">
              {" "}
              🍻No. of travellers: {trip.userSelection?.people}
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
