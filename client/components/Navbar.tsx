import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from 'next/link'

interface NavbarProps {
  linkHref: string;
  linkText: string;
}

const Navbar: React.FC<NavbarProps> = ({ linkHref, linkText }) => {
  return (
    <nav className="flex items-center justify-between bg-black p-5">
        <Link href={'/dashboard'}>
          <span className="text-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-text font-black">Proof of Workout Protocol</span>
        </Link>
        <div className="flex items-center space-x-2">
            <Link href={linkHref}>
                <button className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-2 rounded-lg'>
                    {linkText}
                </button>
            </Link>
            
            <ConnectWallet
                theme="dark"
                className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'
            />
        </div>
    </nav>
  )
} 

export default Navbar
