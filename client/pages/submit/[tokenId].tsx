import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';

interface Activity {
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    sport_type: string;
    type: string;
    start_date: string;
}

interface ActivitiesResponse {
    activities: Activity[];
}

const Submit = () => {
    const router = useRouter(); 
    const { tokenId } = router.query; 

    const STRAVA_CLIENT_ID = process.env.NEXT_STRAVA_CLIENT_ID
    const STRAVA_OAUTH_LINK = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/submit/${tokenId}&approval_prompt=force&scope=activity:read`
    
    const [isLoading, setIsLoading] = useState(false)
    const [activitiesList, setActivitiesList] = useState<ActivitiesResponse | null>(null);

    const hasFetched = useRef(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (!hasFetched.current && params.has('code')) {
            getActivityDetails(String(params.get('code')))
            hasFetched.current = true;
        }
    }, []);

    const getActivityDetails = async (code: string) => {
        try {
            setIsLoading(true);
            const query = await fetch(`/api/proxy?code=${code}`);
            const response = await query.json();
            console.log(response);
            setActivitiesList({ activities: response.activities });
            setIsLoading(false);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className='flex flex-col min-h-screen bg-black'>
            <Navbar linkHref={`/quest/${tokenId}`} linkText={'Back to quest page'}/>

            <div className='mt-10 p-5'>
                <h1 className="text-white text-4xl font-bold">Submit your challenge to the quest</h1>
                <p className='text-white mt-5'>
                    To submit your challenge, please connect to your Strava account, and pick an activity that suits the requirements of this quest
                </p>

                <a href={STRAVA_OAUTH_LINK}>
                    <button className='bg-orange-500 hover:bg-white px-5 py-2 rounded-lg mt-10'>
                        Connect Strava
                    </button>
                </a>
 
                <div className='mt-16'>
                    {isLoading && <p className='text-white'><Loading /></p>}
                    {activitiesList && !isLoading &&

                        <div className='flex flex-col items-center justify-center'>
                            {activitiesList.activities.map((activity, index) => (
                                <div key={index} className="bg-gray-900 text-white p-4 m-2 w-full rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold">{activity.name} - {activity.start_date}</h2>
                                    <p className="text-lg">{activity.type} - {activity.sport_type}</p>
                                    <p>Distance: {activity.distance} meters</p>
                                    <p>Moving Time: {activity.moving_time} seconds</p>
                                    <p>Elapsed Time: {activity.elapsed_time} seconds</p>
                                    <p>Total Elevation Gain: {activity.total_elevation_gain} meters</p>
                                </div>
                            ))}
                        </div>

                    }               
                </div>
            </div>
        </div>
    )
}

export default Submit