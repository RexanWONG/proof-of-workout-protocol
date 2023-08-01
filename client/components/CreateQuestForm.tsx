import { useState } from 'react';
import { Web3Button } from "@thirdweb-dev/react";
import { ChangeEvent } from 'react';

import Loading from './Loading';

interface CreateQuestFormProps {
    contractAddress: string;
    web3ButtonText: string;
    web3ButtonFunction: (metadataURI: string, tokenId?: number) => void;
}

const CreateQuestForm: React.FC<CreateQuestFormProps> = ({ contractAddress, web3ButtonText, web3ButtonFunction }) => {

    const [inputValue, setInputValue] = useState({
        name: "",
        description: "",
        metadataURI: "",
        minWorkoutDuration: 0,
        minStakeAmount: 0.2,
        questDifficulty: 1,
        maxQuestDuration: 0,
    });


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue((prevFormData) => ({
          ...prevFormData,
          [event.target.name]: event.target.value,
        }));    
    };

    const setMinStakeAmount = (amount: number) => {
        setInputValue((prevFormData) => ({
            ...prevFormData,
            minStakeAmount: amount,
        }));
    }

    const setDifficulty = (difficulty: number) => {
        setInputValue((prevFormData) => ({
            ...prevFormData,
            questDifficulty: difficulty,
        }));
    }
    
    return (
        <div className='flex flex-row items-center justify-center gap-20'>
            <div className='flex flex-col'>
                <form className='mt-16'>
                    <div className='mb-10'>
                        <label className='text-2xl text-white font-semibold'>
                            Quest name
                        </label>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            className="border border-gray-400 bg-gray-800 text-white p-2 rounded-md w-full outline-none mt-2 gradient-border"
                            placeholder="workout for 30 mins!"
                            name="name"
                            value={inputValue.name}
                        />
                    </div>

                    <div className='mb-10'>
                        <label className='text-2xl text-white font-semibold'>
                            Quest min stake amount - {inputValue.minStakeAmount}
                        </label>
                        <div className='flex flex-row gap-5 mt-5'>
                            <button type="button" onClick={() => setMinStakeAmount(0.02)} className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'>
                                <h1 className='text-black font-bold'>
                                    0.02 ETH
                                </h1>
                            </button>

                            <button type="button" onClick={() => setMinStakeAmount(0.4)} className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'>
                                <h1 className='text-black font-bold'>
                                    0.4 ETH
                                </h1>
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col mb-10'>
                        <label className='text-2xl text-white font-semibold'>
                            Quest difficulty - {inputValue.questDifficulty}
                        </label>

                        <div className='flex flex-row gap-5 mt-5'>
                            <button type="button" onClick={() => setDifficulty(1)} className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'>
                                <h1 className='text-black font-bold'>
                                    1 - EASY
                                </h1>
                            </button>

                            <button type="button" onClick={() => setDifficulty(2)} className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'>
                                <h1 className='text-black font-bold'>
                                    2 - MEDIUM
                                </h1>
                            </button>

                            <button type="button" onClick={() => setDifficulty(3)} className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'>
                                <h1 className='text-black font-bold'>
                                    3 - HARD
                                </h1>
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col mb-10'>
                        <label className='text-2xl text-white font-semibold'>
                            Maximum quest duration - {inputValue.m}
                        </label>

                        <div className='flex flex-row gap-5 mt-5'>
                            <button type="button" onClick={() => setDifficulty(1)} className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'>
                                <h1 className='text-black font-bold'>
                                    1 - EASY
                                </h1>
                            </button>

                            <button type="button" onClick={() => setDifficulty(2)} className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'>
                                <h1 className='text-black font-bold'>
                                    2 - MEDIUM
                                </h1>
                            </button>

                            <button type="button" onClick={() => setDifficulty(3)} className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'>
                                <h1 className='text-black font-bold'>
                                    3 - HARD
                                </h1>
                            </button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateQuestForm;
