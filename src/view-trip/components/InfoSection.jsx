import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
  return (
    <div>
      <img
        src="/placeholder.jpg"
        alt=""
        className="h-[340px] w-full object-cover rounded-xl"
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
