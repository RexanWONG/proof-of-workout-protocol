const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config()

const port = process.env.PORT || 3333;
const apiBaseUrl = 'https://www.strava.com/api/v3/';

const OPTIMISM_CLIENT_ID = process.env.OPTIMISM_CLIENT_ID;
const OPTIMISM_CLIENT_SECRET = process.env.OPTIMISM_CLIENT_SECRET;

const BASE_CLIENT_ID = process.env.BASE_CLIENT_ID;
const BASE_CLIENT_SECRET = process.env.BASE_CLIENT_SECRET;

const ZORA_CLIENT_ID = process.env.ZORA_CLIENT_ID;
const ZORA_CLIENT_SECRET = process.env.ZORA_CLIENT_SECRET;

const MODE_CLIENT_ID = process.env.MODE_CLIENT_ID;
const MODE_CLIENT_SECRET = process.env.MODE_CLIENT_SECRET;

const LINEA_CLIENT_ID = process.env.LINEA_CLIENT_ID;
const LINEA_CLIENT_SECRET = process.env.LINEA_CLIENT_SECRET;

const getAccessToken = async (AUTHORIZATION_CODE, version) => {
  try {
    if (version == 'optimism') {
      const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
        client_id: OPTIMISM_CLIENT_ID,
        client_secret: OPTIMISM_CLIENT_SECRET,
        code: AUTHORIZATION_CODE,
        grant_type: 'authorization_code',
      });
  
      return tokenResponse.data.access_token;

    } else if (version == 'base') {
      const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
        client_id: BASE_CLIENT_ID,
        client_secret: BASE_CLIENT_SECRET,
        code: AUTHORIZATION_CODE,
        grant_type: 'authorization_code',
      });

      return tokenResponse.data.access_token;
      
    } else if (version == 'zora') {
      const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
        client_id: ZORA_CLIENT_ID,
        client_secret: ZORA_CLIENT_SECRET,
        code: AUTHORIZATION_CODE,
        grant_type: 'authorization_code',
      });

      return tokenResponse.data.access_token;
    } else if (version == 'mode') {
      const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
        client_id: MODE_CLIENT_ID,
        client_secret: MODE_CLIENT_SECRET,
        code: AUTHORIZATION_CODE,
        grant_type: 'authorization_code',
      });

      return tokenResponse.data.access_token;
    } else if (version == 'linea') {
      const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
        client_id: LINEA_CLIENT_ID,
        client_secret: LINEA_CLIENT_SECRET,
        code: AUTHORIZATION_CODE,
        grant_type: 'authorization_code',
      });

      return tokenResponse.data.access_token;
    }
    
  } catch (error) {
    console.error(error.response.data);
  }
}

app.get('/user-id', async (req, res) => {
  try {
    const AUTHORIZATION_CODE = req.query.code;

    if (!AUTHORIZATION_CODE) {
      return res.status(400).json({
        message: 'Authorization code is required as a query parameter'
      });
    }
    
    const ACCESS_TOKEN = await getAccessToken(AUTHORIZATION_CODE)
    const apiHeaders = { headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` } };

    const response = await axios.get(`${apiBaseUrl}/athlete`, apiHeaders);

    res.json({
      id: response.data.id,
      name: response.data.username
    });

  } catch (error) {
    console.error('Error in /user-id endpoint:', error.response.data);
    res.status(500).json({
      message: 'Failed to get User ID'
    });
  }
})

app.get('/user-activities', async (req, res) => {
  try {   
    const AUTHORIZATION_CODE = req.query.code;
    const AFTER_TIMESTAMP = req.query.after;
    const VERSION = req.query.version

    if (!AUTHORIZATION_CODE) {
      return res.status(400).json({
        message: 'Authorization code is required as a query parameter'
      });
    } 
    
    if (!AFTER_TIMESTAMP) {
      return res.status(400).json({
        message: 'After timestamp is required as a query parameter'
      });
    } 
    
    const ACCESS_TOKEN = await getAccessToken(AUTHORIZATION_CODE, VERSION)
    const apiHeaders = { headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` } };

    const response = await axios.get(`${apiBaseUrl}athlete/activities?after=${AFTER_TIMESTAMP}`, apiHeaders);
    
    res.json({
      activities: response.data
    });

  } catch (error) {
    console.error('Error in /strava-athlete endpoint:', error.response.data);
    res.status(500).json({
      message: 'Failed to get Strava athlete data'
    });
  }
});

const allowedOrigins = ['http://localhost:3001/', 'http://localhost:3001/submit', 'https://proof-of-workout-protocol-cosensys.vercel.app/submit', 'https://proof-of-workout-protocol-supahack-optimism-goerli.vercel.app/submit/'];

app.use(cors({
  origin: function (origin, callback) {
    if(!origin) return callback(null, true);
    
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
