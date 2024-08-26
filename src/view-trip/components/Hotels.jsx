import React from 'react'
import { Link } from 'react-router-dom'

const Hotels = ({trip}) => {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5 mb-5'>Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.hotelOptions?.map((item, index) => (
            <Link className='text-black hover:text-black' to={"https://www.google.com/maps/search/?api=1&query="+item?.hotelName+", "+item?.hotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src="/placeholder.jpg" alt="" className='rounded-xl'/>
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
        ))}
      </div>
    </div>
  )
}

export default Hotels
