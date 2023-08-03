import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContract, useContractRead } from "@thirdweb-dev/react";

import { abi, contractAddress } from '../../constants/QuestManager/questManager';
import Navbar from '../../components/Navbar';

const Start= () => {
    const router = useRouter(); 
    const { tokenId } = router.query; 

    const { contract } = useContract(contractAddress, abi);
    const { data: quests, isLoading: isQuestsLoading, error: questsError } = useContractRead(contract, "getQuests");

    const [quest, setQuest] = useState([])
    
    useEffect(() => {
        if (questsError) {
        console.error("Failed to read contract", questsError);
        }

        if (!isQuestsLoading && quests) {
            for (let i = 0 ; i < quests.length ; i++) {
                if (Number(quests[i].tokenId) === Number(tokenId)) {
                    console.log(quests[i])    
                    setQuest(quests[i])
                }
            }
        }

    }, [quests, isQuestsLoading, questsError]);

    return (
        <div className='flex flex-col min-h-screen bg-black'>
            <Navbar linkHref={`/quest/${tokenId}`} linkText={'Back to quest page'}/>

            <div className='mt-10 p-5'>
                <h1 className="text-white text-4xl font-bold p-5">Start Quest</h1>

                <h2>To begin, you must</h2>
            </div>
        </div>
    )
}

export default Start