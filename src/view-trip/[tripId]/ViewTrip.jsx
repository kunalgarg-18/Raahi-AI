import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Itinerary from '../components/Itinerary';
import Footer from '../components/Footer';

const ViewTrip = () => {

    const {tripId} = useParams();

    useEffect(() => {
        tripId&&GetTripData();
    },[tripId])

    const [trip, setTrip] = useState([])
    const GetTripData = async() => {
        const docRef = doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists){
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data())           
        }else{
            console.log("No such document");
            toast('No trip Found!')
            
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section  */}
        <InfoSection trip={trip}/>
      {/* Recommended Hotels  */}
        <Hotels trip={trip}/>
      {/* Itinerary  */}
        <Itinerary trip={trip}/>
      {/* Footer  */}
      <Footer/>
    </div>
  )
}

export default ViewTrip
