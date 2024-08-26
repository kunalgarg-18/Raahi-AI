import React from 'react'
import ItineraryItem from './ItineraryItem'

const Itinerary = ({trip}) => {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Daywise Itinerary</h2>

      <div>
        {trip?.tripData?.itinerary?.map((item,index) => (
            <div className='mt-2'>
                <h2 className='font-bold text-lg mt-5'>Day {item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5'>
                    {item.plan.map((place, index) => (
                        <div className='my-3'>
                            <h2 className='font-medium text-sm text-orange-700'>{place.time}</h2>
                            <ItineraryItem place={place} trip={trip}/>
                            
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Itinerary
