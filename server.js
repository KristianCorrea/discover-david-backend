const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {json} = require('body-parser');
const axios = require('axios');

const app = express();

app.use(
    cors({
    })
);
app.use(json());

dotenv.config(); //Comment this out for production

const BASE_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/resources/image`

const auth = {
    username: process.env.API_KEY,
    password: process.env.API_SECRET,
}


app.get('/',  (req, res) => {
    return res.status(200).json("Server is up and running.")
});

app.get('/photos', async (req, res) => {
    const response = await axios.get(BASE_URL, {
        auth
    })
    return res.send(response.data);
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));