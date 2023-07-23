import { useRouter } from 'next/router'
import { useEffect } from 'react'

import LandingDescription from '../components/LandingDescription'
import { useMetaMask } from '../hooks/useMetamask'

const Landing = () => {
  const router = useRouter()
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()

  useEffect(() => {
    if (wallet && wallet.accounts.length > 0) {
      router.push('/app')
    }
  }, [wallet, router])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-black text-white'>
        <div className='text-center max-w-[1000px]'>
            <LandingDescription />

            {!hasProvider &&
              <a href="https://metamask.io" target="_blank">
                Install MetaMask
              </a>
            }

            {hasProvider && wallet.accounts.length < 1 &&
              <button 
                  disabled={isConnecting} 
                  onClick={connectMetaMask} 
                  className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'
                >
                  <h1 className='text-black font-bold'>
                    Connect Metamask
                  </h1>
              </button>
            }
        </div>
    </div>
  )
}

export default Landing
