import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravellersList } from '@/constants/Options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast} from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {FcGoogle} from "react-icons/fc"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import {AiOutlineLoading3Quarters} from "react-icons/ai"

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
  },[formData])

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (err) => console.log(err)    
  })

  const onGenerateTrip = async() => {

    const user = localStorage.getItem('user')

    if(!user){
      setOpenDialog(true);
      return;
    }
    if(!formData?.location || !formData?.budget || !formData?.people || !formData?.noOfDays){
      toast.error("Kindly enter all details.")
    }
    if(formData?.noOfDays > 10){
      
      toast.error('Number of Days cannot be more than 10.')
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{people}', formData?.people)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)

    console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT)

    console.log(result?.response?.text())
    setLoading(false);
    saveTrip(result?.response?.text())
  }

  const saveTrip = async(TripData) => {

    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData : JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((res) => {
      console.log(res)
      localStorage.setItem('user',JSON.stringify(res.data));
      setOpenDialog(false);
      onGenerateTrip();
    })
  }
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl text-[#364F6B]">
        Tell us your travel preferences ✈️🏕️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e45b00] to-[#702e02]">
          RaaHi AI
        </span>{" "}
        will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium text-[#364F6B]">
            Destination you want to travel?
          </h2>
          <GooglePlacesAutocomplete 
            
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v)
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium text-[#364F6B]">
            How many days you want to stay?
          </h2>
          <Input
            placeholder={"Ex. 3 Days"}
            type="number"
            onChange = {(e) => handleInputChange('noOfDays', e.target.value)}
            className="border border-[#3FC1C9] focus:border-[#FC5185] focus:ring-[#FC5185] rounded-lg"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium text-[#364F6B]">
          What is Your Budget?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer bg-[#F5F5F5] hover:border-[#FC5185]
                ${formData?.budget ==item.title&&'scale-110 shadow-md border-orange-500'}`}
            >
              <h2 className="text-4xl text-[#364F6B]">{item.icon}</h2>
              <h2 className="font-bold text-lg text-[#364F6B]">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium text-[#364F6B]">
          Who will be traveling with you on your adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravellersList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('people', item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer bg-[#F5F5F5] hover:border-[#FC5185]
              ${formData?.people ==item.people&&'scale-110 shadow-md border-orange-500'}`}>
              <h2 className="text-4xl text-[#364F6B]">{item.icon}</h2>
              <h2 className="font-bold text-lg text-[#364F6B]">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button 
        disabled={loading}
        onClick={onGenerateTrip}>
          {loading?<AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> :
              <>
          Generate Trip
          </>}
        </Button>
      </div>

      <Dialog open={openDialog}>
        
        <DialogContent>
          
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely.</p>

            <Button
            
             onClick={login}
             className='w-full mt-5 flex gap-4 items-center'>
              
              <FcGoogle className='h-7 w-7'/>
              Sign In With Google
              
            </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
    
  );
}

export default CreateTrip;
