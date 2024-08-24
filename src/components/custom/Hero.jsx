import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h2 className='font-extrabold text-[47px] text-center mt-16'><span className='text-[#f56551]'>Plan Your Next Adventure with Raahi AI: </span> Personalized Itineraries at Your Fingertips</h2>
      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests.</p>
      <Link to={'/create-trip'}>
      <Button>Get Started, Its Free!</Button>
      </Link>
    </div>
  )
}

export default Hero
