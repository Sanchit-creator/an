const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./config');
const router = require('./api');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
})