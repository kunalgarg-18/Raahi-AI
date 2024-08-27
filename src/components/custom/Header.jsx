import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import{
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { CgLogOut } from "react-icons/cg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
 
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';



const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  

  const login = useGoogleLogin({
    onSuccess:(res) => GetUserProfile(res),
    onError: (error) => console.log(error)
    
  })
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
      window.location.reload();
    })
  }
  useEffect(() => {
    console.log(user)
  },[])
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <a href="/">
        <img src="/logo.svg" alt="" />
      </a>
      <div>
        {user ? 
        <div className='flex items-center gap-4'>
          <a href="/create-trip">
          <Button variant="outline" className="rounded-full hover:bg-gray-100 hover:outline-none">+ Create Trip</Button>
          </a> 
          <a href="/my-trips">
          <Button variant="outline" className="rounded-full hover:bg-gray-100 hover:outline-none">My Trips</Button>
          </a> 
          <Popover >
            <PopoverTrigger asChild className='bg-white rounded-full '>
            <img src={user?.picture} className='h-[35px] w-[35px] cursor-pointer rounded-full' alt="" />
            </PopoverTrigger>
            <PopoverContent className='bg-white'>
              <h2 className='cursor-pointer  flex gap-2' onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
                window.location.href('/');
               
              }}><CgLogOut className='h-7 w-7'/>Logout</h2>
            </PopoverContent>
          </Popover>
        </div> : 
        <Button onClick={()=>setOpenDialog(true)} className='bg-black text-white hover:bg-gray-900 hover:text-white hover:scale-105'>Sign In</Button>}
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
  )
}

export default Header
