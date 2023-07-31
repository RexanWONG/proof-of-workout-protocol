const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config()

const port = process.env.PORT || 3333;
const apiBaseUrl = 'https://www.strava.com/api/v3/';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const getAccessToken = async (AUTHORIZATION_CODE) => {
  try {
    const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: AUTHORIZATION_CODE,
      grant_type: 'authorization_code',
    });

    return tokenResponse.data.access_token;
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

    const ACCESS_TOKEN = await getAccessToken(AUTHORIZATION_CODE)
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

app.get('/activity-duration', async (req, res) => {
  try {
    const ACTIVITY_ID = req.query.id;
    const AUTHORIZATION_CODE = req.query.code;

    if (!AUTHORIZATION_CODE) {  
      return res.status(400).json({
        message: 'Authorization code is required as a query parameter'
      });
    } else if (!ACTIVITY_ID) {
      return res.status(400).json({
        message: 'Activity ID is required as a query parameter'
      });
    }

    const ACCESS_TOKEN = await getAccessToken(AUTHORIZATION_CODE)
    const apiHeaders = { headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` } };

    const response = await axios.get(`${apiBaseUrl}activities/${ACTIVITY_ID} `, apiHeaders);
    
    res.json({
      athlete: response.data.athlete.id,
      moving_time: response.data.moving_time
    });
    
  } catch (error) {
    console.error('Error in /activity-duration endpoint:', error.response.data);
    res.status(500).json({
      message: 'Failed to get activity duration data'
    });
  }
});

const allowedOrigins = ['http://localhost:3000/', 'http://localhost:3000/dashboard'];

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
