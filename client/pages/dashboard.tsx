import { useAddress, useContractRead, useContract } from "@thirdweb-dev/react";

import { abi, contractAddress } from '../constants/AccountManager/accountManager';

import Navbar from '../components/Navbar';
import RegisterStrava from '../components/Strava/RegisterStrava';

const Dashboard = () => {  
  const address = useAddress();

  const { contract } = useContract(contractAddress, abi);
  const { data: isAccountRegistered } = useContractRead(contract, "checkIfAccountIsRegistered", [address])

  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <Navbar linkHref={'/create'} linkText={'Create quest'}/>

      {isAccountRegistered ? (
        <h1 className="text-white">You are registered!</h1>
      ) : (
        <RegisterStrava address={String(address)}/>
      )}
    </div>
  )
}

export default Dashboard


