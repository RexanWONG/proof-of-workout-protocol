import { ThirdwebNftMedia } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';

import React from 'react'

interface Metadata {
    name: string;
    image: string;
    id: string;
}

interface NFTRendererProps {
    ownedItems: Array<{ metadata: Metadata; owner: string; supply: string; type: string }>;
}


const NFTRenderer: React.FC<NFTRendererProps> = ({ ownedItems }) =>  {
    const router = useRouter();

    const addNFTIntoMetamask = async(id: string) => {
        try {
            // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
            const wasAdded = await window.ethereum.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC721',
                options: {
                  address: '0xD2FD5B0Ed1d8c79E03a40ED1caD6e9fcDc39d3F4',
                  tokenId: id, 
                },
              },
            });
          
            if (wasAdded) {
              alert('User successfully added the token!');
            } else {
              alert('User did not add the token.');
            }
          } catch (error) {
            alert(error);
        }
    }

    const handleRowClick = (id: number) => {
        router.push(`/quest/${id}`);
    };
    return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-10"> 
            {ownedItems.map((item) => 
                <div>
                    <div key={item.metadata.id} onClick={() => handleRowClick(Number(item.metadata.id))}>
                        <div className='transition-all duration-200 ease-in-out transform hover:scale-105 rounded-2xl overflow-hidden shadow-md'>
                            <ThirdwebNftMedia 
                                metadata={item.metadata as any}   
                                controls={true} 
                                className='className="!md:h-96 !md:w-96 !h-full !w-full !rounded-t-2xl !rounded-b-sm !object-cover"' />

                            <div className="block p-4">
                                <h3 className="font-extrabold text-[24px] text-white text-left leading-[26px]">{item.metadata.name}</h3>                        </div>
                        </div>
                    </div>
                    <button onClick={() => addNFTIntoMetamask(item.metadata.id)} className='text-gray-400 hover:underline hover:cursor-pointer mt-2'>
                        Add NFT into your Metamask
                    </button>

                </div>
            )}
            
        </div>
    )
}

export default NFTRenderer