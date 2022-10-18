const connMongo = require("./db");

const express = require('express')
connMongo();

const app = express()
const port = 5000

//middleware

app.use(express.json())

// routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));



app.listen(port, () => {
    console.log(` [ E-classroom app listening on port ${port} ]`)
  })