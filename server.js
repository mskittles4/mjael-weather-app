const url = require('url');
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const needle = require('needle');

const PORT = process.env.PORT || 5000;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;

const app = express();

app.get('/api', async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
    const data = apiRes.body;

    //log req to api
    // if (process.env.NODE_ENV !== 'production') {
    //   console.log(`REQ: ${API_BASE_URL}?${params}`);
    // }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err });
  }
});

//set static folder
app.use(express.static('public'));

//cors enabling
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
