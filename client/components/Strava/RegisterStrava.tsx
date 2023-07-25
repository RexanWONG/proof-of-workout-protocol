import { useEffect, useState, useRef } from 'react';
import truncateEthAddress from 'truncate-eth-address';

import Loading from '../Loading';
import RegisterUser from '../RegisterUser';

interface RegisterStravaProps {
    address: string;
}

const RegisterStrava:React.FC<RegisterStravaProps> = ({ address }) => {
    const STRAVA_CLIENT_ID = process.env.NEXT_STRAVA_CLIENT_ID
    const STRAVA_OAUTH_LINK = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/dashboard&approval_prompt=force&scope=activity:read`

    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState('')

    const hasFetched = useRef(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (!hasFetched.current && params.has('code')) {
        getIdAndName(String(params.get('code')));
        hasFetched.current = true;
        }
    }, []);

    const getIdAndName = async (code: string) => {
        setIsLoading(true);
        const query = await fetch(`/api/proxy?code=${code}`)
        const response = await query.json()
        setUserId(response.id)
        setUserName(response.name)
        setIsLoading(false);
    }
    return (
        <div className='flex flex-col items-center justify-center mt-32'>
          <h1 className='text-white text-4xl'>
            <span className='font-bold'>
              {truncateEthAddress(String(address))}{' '}
            </span>
            is not registered on POWP!
          </h1>
          <p className='text-gray-400 text-2xl mt-8'>Register by connecting your Strava account</p>

          <a href={STRAVA_OAUTH_LINK}>
            <button className='bg-orange-500 hover:bg-white px-5 py-2 rounded-lg mt-10'>
                Connect Strava
            </button>
          </a>

          
          <div className='mt-16'>
            {isLoading && <p className='text-white'><Loading /></p>}
            {userId && !isLoading && 
              <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center mb-5'>
                  <h1 className='text-gray-400 text-2xl'>Your Strava User ID</h1>
                  <p className='text-white text-4xl'>{userId}</p>
                </div>
                <div className='flex flex-col items-center justify-center mb-5'>
                  <h1 className='text-gray-400 text-2xl'>Your Strava Username</h1>
                  <p className='text-white text-4xl'>{userName}</p>
                </div>

                <RegisterUser 
                  address={String(address)}
                  stravaId={Number(userId)}
                />
              </div>
            }
          </div>
        </div>
    )
}

export default RegisterStrava