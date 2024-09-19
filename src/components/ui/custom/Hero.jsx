import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-centre mx-56 gap-20'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#ff6347]'>Discover Your Next Adventure with AI:</span>
        Personalised Itineraries at Your Fingertips
      </h1>
      <p className='text-xl text-gray-500 text-center'>
        Build, personalize, and optimize your itineraries with our free AI trip planner. Designed for vacations, workations, and everyday adventures.
      </p>
      <Link to={'create_trip'}>
        <Button>
          Get Started
        </Button>
      </Link>

    </div>
  )
}

export default Hero
