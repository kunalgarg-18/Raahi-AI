import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCardItem = ({item}) => {

    const [photoUrl, setPhotoUrl] = useState();
    const GetPlacePhoto = async() => {
        const data = {
            textQuery: item?.hotelName.toString()
        }
        const result = await GetPlaceDetails(data).then(res => {
            console.log(res.data.places[0].photos[3].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl)
    
        })
    }

    useEffect(() => {
        item&&GetPlacePhoto()
    },[item])

  return (
    <div>
      <Link className='text-black hover:text-black' to={"https://www.google.com/maps/search/?api=1&query="+item?.hotelName+", "+item?.hotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl?photoUrl:'placeholder.jpg'} alt="" className='rounded-xl h-[200px] w-full object-cover'/>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-medium'>
                        {item.hotelName}
                    </h2>
                    <h2 className="text-xs text-gray-500">📍{item?.hotelAddress}</h2>
                    <h2 className='text-sm font-bold text-red-800'>💰{item?.price}</h2>
                    <h2 className='text-xs items-center'>Rating: {item?.rating}⭐</h2>
                </div>
            </div>
            </Link>
    </div>
  )
}

export default HotelCardItem
