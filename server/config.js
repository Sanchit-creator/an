const mongoose = require('mongoose');

const conn_url = 'mongodb+srv://sanchit:sanchit@cluster0.mpmn8yz.mongodb.net/?retryWrites=true&w=majority'

const db = mongoose.connect(
    conn_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Mongo DB connection established successfully'))
.catch((error) => {console.log(error);})

module.exports = db;
