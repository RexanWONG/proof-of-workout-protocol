import { useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { useRouter } from 'next/router';

import { abi, contractAddress } from '../constants/AccountManager/accountManager';

interface RegisterUserProps {
    address: string;
    stravaId: number;
}

const RegisterUser: React.FC<RegisterUserProps> = ({ address, stravaId }) => {
    const router = useRouter(); 
    const { contract } = useContract(contractAddress, abi);
    const { mutateAsync: registerAccount } = useContractWrite(contract, "registerAccount");

    const handleRegisterAccount = async () => { // Remove the extra parenthesis here
        try {
          await registerAccount({ args: [address, stravaId] });
          alert("Account Registered!") 
          router.push('/dashboard')
        } catch (error) {
          console.error(error)
        }
    }
    
    return (
        <Web3Button
            theme="dark"
            contractAddress={contractAddress}
            action={handleRegisterAccount}
            className='bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:animate-text px-5 py-3 rounded-lg'
        >
            Register with {stravaId}!
        </Web3Button>
    )
}

export default RegisterUser;
