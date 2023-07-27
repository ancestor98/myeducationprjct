require('./config/configDB');
const { route } = require('./routes/userRoute');
const express = require('express');
const PORT = process.env.PORT || 2422

const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/progressPal', route)

app.listen(PORT, ()=>{
    console.log('listening on PORT: '+PORT);
});