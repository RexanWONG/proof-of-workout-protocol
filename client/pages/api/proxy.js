import axios from 'axios';

export default async function handler(req, res) {
  try {
    const url = "https://061a-173-244-62-32.ngrok-free.app/user-id";
    const params = {
      params: req.query
    };
    const response = await axios.get(url, params);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
