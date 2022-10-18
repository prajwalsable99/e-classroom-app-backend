const mongoose = require('mongoose');

const URI='mongodb://localhost:27017/e-classreom-db?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const connMongo =()=>{
    
    mongoose.connect(URI,()=>{console.log("[ Connection establsihed successfully ! MONGO !!! ]");});

}

module.exports=connMongo;