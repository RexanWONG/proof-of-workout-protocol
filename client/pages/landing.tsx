import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LandingDescription from '../components/LandingDescription';

const Landing = () => {

  return (
    <div className='font-inter flex flex-col justify-center items-center min-h-screen bg-black text-white'>
        <div className='text-center max-w-[1000px]'>
            <LandingDescription />

            <Link href={'/dashboard'}>
              <button className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'>
                  <h1 className='text-black font-bold'>
                    Launch app
                  </h1>
              </button>
            </Link>
        </div>
    </div>
  )
}

export default Landing