const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {

mongoose.connect('mongodb+srv://tipsyalleygh:oqA3Lg5ZWUbxi4At@tipsyalleygh.ddf6jwm.mongodb.net/TipsyAlleyDB?retryWrites=true&w=majority&appName=TipsyAlleyGh', {
   
})
.then(() => console.log('Tipsy Alley MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

};


module.exports = connectDB;
