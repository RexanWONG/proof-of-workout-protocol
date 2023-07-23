const axios = require('axios');
const express = require('express');
const app = express();

const port = process.env.PORT || 3333;
const apiBaseUrl = 'https://www.strava.com/api/v3/';
const endpoints = {
  athletes: '/athletes',
  stats: '/stats',
  oauthToken: '/oauth/token',
};

const CLIENT_ID = 110847;
const CLIENT_SECRET = '84443ddcbf9186e188d3e83ab728fa71b37f4f36';
const REFRESH_TOKEN = '5a1e54818159be2ad85f4ffc7f8914a00c7f4696';
const USER_ID = 66742430;

// Define /strava-stats endpoint
app.get('/strava-stats', async (req, res) => {
  try {
    // Get the access token
    const tokenResponse = await axios.post(`${apiBaseUrl}${endpoints.oauthToken}`, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    });

    const ACCESS_TOKEN = tokenResponse.data.access_token;
    const apiHeaders = { headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` } };

    // Get the athlete data
    const athleteResponse = await axios.get(`${apiBaseUrl}/athletes/${USER_ID}`, apiHeaders);

    res.json({
      data: athleteResponse.data.id
    });
  } catch (error) {
    console.error('Error in /strava-stats endpoint:', error.response.data);
    res.status(500).json({
      message: 'Failed to get Strava stats'
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
