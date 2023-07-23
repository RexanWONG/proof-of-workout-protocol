import React from 'react'

const Landing = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-black text-white'>
        <div className='text-center max-w-[1000px]'>
            <h1 className='text-8xl font-[900] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-text mb-4'>
                Proof of Workout Protocol <span className='text-white'>💪</span>
            </h1>
            <p className='text-[34px] text-white mb-6'>Incentivizing anons to touch grass 🍀</p>
            <p className='text-[20px] text-gray-400 mb-12'>
                POWP is designed to motivate and reward physical fitness through a gamified system of quests and token-based incentives. By staking Ether and earning POW tokens, users are incentivized to complete fitness challenges, share their achievements, and challenge others in a fitness-oriented social network.
            </p>

            <button className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'>
              <h1 className='text-black font-bold'>
                Connect Wallet
              </h1>
            </button>

      
        </div>
    </div>
  )
}

export default Landing
