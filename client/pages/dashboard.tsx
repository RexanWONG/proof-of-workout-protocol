import { useAddress, useContractRead, useContract } from "@thirdweb-dev/react";

import { abi, contractAddress } from '../constants/AccountManager/accountManager';

import Navbar from '../components/Navbar';
import RegisterUser from '../components/Strava/RegisterUser';

const Dashboard = () => {  
  const address = useAddress();

  const { contract } = useContract(contractAddress, abi);
  const { data: isAccountRegistered } = useContractRead(contract, "checkIfAccountIsRegistered", [address])

  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <Navbar linkHref={'/create'} linkText={'Create quest'}/>

      {isAccountRegistered ? (
        <h1>hello</h1>
      ) : (
        <RegisterUser address={String(address)}/>
      )}
    </div>
  )
}

export default Dashboard
