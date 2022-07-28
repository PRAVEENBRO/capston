const mongoose = require('mongoose');
require('dotenv').config();

const dburl = process.env.DATABASEURL
// const dburl = 'mongodb+srv://devilfighterzz:Pinaya6667@cluster1.xzeft.mongodb.net/userdatas?retryWrites=true&w=majority'

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log("DataBase connection FAILED", err);
    }
    else {
        console.log(" DB Connected ");
    }
}

)
