import React, { useEffect } from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import { useAddress, useContractRead, useContract } from "@thirdweb-dev/react";
import Link from 'next/link'

import { abi, contractAddress } from '../constants/Token/token'


interface NavbarProps {
  linkHref: string;
  linkText: string;
}

const Navbar: React.FC<NavbarProps> = ({ linkHref, linkText }) => {
  const address = useAddress()
  const { contract } = useContract(contractAddress, abi);

  const { data, isLoading, error } = useContractRead(contract, "getBalanceOfAddress", [address]);

  return (
    <nav className="flex items-center justify-between bg-black p-5">
        <Link href={'/dashboard'}>
          <span className="text-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-text font-black">Proof of Workout Protocol</span>
        </Link>
        <div className="flex items-center space-x-2">
            <h1 className='text-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-text font-bold mr-10'>
              💪 {Number(data)/1000000000000000000} POW tokens
            </h1>
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
