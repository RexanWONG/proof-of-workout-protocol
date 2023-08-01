import CreateQuestForm from '../components/CreateQuestForm';
import Navbar from '../components/Navbar';

import { useContractWrite, useContract } from "@thirdweb-dev/react";
import { abi, contractAddress } from '../constants/QuestManager/questManager'
import { useRouter } from 'next/router';

const Create = () => {
  const router = useRouter(); 
  const { contract } = useContract(contractAddress, abi);

  const { mutateAsync: createQuest } = useContractWrite(contract, "createQuest");

  const handleCreateQuest = async (metadataURI: string) => {
    try {
      await createQuest({ args: [metadataURI] });
      alert("Quest Created!") 
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className='min-h-screen bg-black'>
        <Navbar linkHref={'/dashboard'} linkText={'Back to home'}/> 
        <div className='flex flex-col items-start justify-start p-10'>
          <h1 className='text-4xl text-white font-bold'>Create Quest</h1>

          <CreateQuestForm 
            contractAddress={contractAddress}
            web3ButtonText={'Create quest!'}
            web3ButtonFunction={handleCreateQuest}
          />
        </div>
    </div>
  )
}

export default Create