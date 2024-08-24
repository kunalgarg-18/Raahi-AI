import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" alt="" />
      <div>
        <Button className='bg-black text-white hover:bg-gray-900 hover:text-white hover:scale-105'>Sign In</Button>
      </div>
    </div>
  )
}

export default Header
