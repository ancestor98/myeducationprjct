require('dotenv').config();
const mongoose = require('mongoose');

const dbUSER = process.env.DB_USERNAME
const dbPASS = process.env.DB_PASSWORD

const db = `mongodb+srv://${dbUSER}:${dbPASS}@cluster0.advr8oy.mongodb.net/`

mongoose.connect(db).then(()=>{
    console.log('Successfully connected to Database')
}).catch(()=>{
    console.log('Failed to connect to Database')
})
