import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-4 md:mx-16 lg:mx-24 xl:mx-56 gap-6 lg:gap-9'>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-center mt-8 md:mt-12 lg:mt-16 flex flex-col gap-5">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5100] to-[#8e3302ef]">
          Discover Your Next Adventure With RaahiAI:
        </span>{" "}
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center">
        From hidden gems to iconic landmarks, RaahiAI turns your travel dreams into
        unforgettable adventures.
      </p>
      
      <Link to={"/create-trip"} className="relative z-10">
        <Button className="font-medium text-sm sm:text-base md:text-lg mt-5 lg:mt-7">
          Get Started, It's Free
        </Button>
      </Link>
      
      <img src="/landing.png" className='-mt-[120px] w-50' />
    </div>
  )
}

export default Hero
