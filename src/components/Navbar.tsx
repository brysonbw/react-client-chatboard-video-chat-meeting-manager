import React from 'react'
import { Link } from 'react-router-dom';
import chatBoard from '../assets/chatboard-logo.png'



const Navbar = () => {
   
  return (
    <div className=" top-0 w-full z-30 clearNav md:bg-opacity-90 transition duration-300 ease-in-out">
      <div className="flex flex-col max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-2">
        <img 
              src={chatBoard}
              className='borderCircle'
              height={50}
              width={50}
              alt={'chatboard-logo'}
            />
          <Link className='mx-auto' to='/' >
          <p className="md:ml-2  text-black">Chatboard: Meeting Manager</p> 
          </Link>   
        </div>
      </div>
    </div>
  )
}

export default Navbar