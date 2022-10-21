const connMongo = require("./db");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


const express = require('express')
connMongo();

const app = express()
const port = 5000
app.use(cors(corsOptions))
//middleware

app.use(express.json())

// routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));



app.listen(port, () => {
    console.log(` [ E-classroom app listening on port ${port} ]`)
  })