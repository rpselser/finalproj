const express = require('express');
const axios = require('axios');
const { connectDB } = require('../db');
/*require('dotenv').config();*/

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/search', async (req, res) => {
  const player = req.body.player;

  const options = {
    method: 'GET',
    url: 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBPlayerInfo',
    params: {
      playerName: player,
      getStats: 'false',
      statsSeason: '2024'
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    const db = await connectDB();
    await db.collection('searchHistory').insertOne({
      name: player,
      timestamp: new Date(),
      result: response.data
    });
    console.log("response:", response.data);
    res.render('result', { data: response.data, player });
  } catch (error) {
    console.error(error);
    res.send('error fetching');
  }
});

router.get('/history', async (req, res) => {
  try {
    const db = await connectDB();
    const history = await db.collection('searchHistory')
      .find()
      .sort({ timestamp: -1 })
      .limit(12)
      .toArray();

    res.render('history', { history });
  } catch (err) {
    res.send("error getting search histroy " + err.message);
  }
});

module.exports = router;
