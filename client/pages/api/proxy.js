import axios from 'axios';

export default async function handler(req, res) {
  try {
    const url = "https://90a1-173-244-62-24.ngrok-free.app/user-activities";
    const params = {
      params: req.query
    };
    const response = await axios.get(url, params);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error fetching data" });
  }
}
