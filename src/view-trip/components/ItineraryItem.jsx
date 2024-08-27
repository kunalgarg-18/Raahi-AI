import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const ItineraryItem = ({place,trip}) => {
    const [photoUrl, setPhotoUrl] = useState();
    const GetPlacePhoto = async() => {
        const data = {
            textQuery: place?.placeName.toString()
        }
        const result = await GetPlaceDetails(data).then(res => {

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[2].name)
            setPhotoUrl(PhotoUrl)
    
        })
    }

    useEffect(() => {
        place&&GetPlacePhoto()
    },[place])
  return (
    <Link className='text-black hover:text-black' to={"https://www.google.com/maps/search/?api=1&query="+place.placeName+", "+trip?.userSelection?.location?.label} target='_blank'>
    <div className='border rounded-xl p-2 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={photoUrl?photoUrl:'placeholder.jpg'} className='w-[125px] h-[125px] rounded-xl object-cover' alt="" />
      <div>
        <h2 className='font-bold text-lg'>
            {place?.placeName}
        </h2>
        <p className='text-sm text-gray-500'>{place?.placeDetails}</p>
        <h2 className='mt-2'>🕛 {place.timeToTravel}</h2>
        
      </div>
    </div>
    </Link>
  )
}

export default ItineraryItem
