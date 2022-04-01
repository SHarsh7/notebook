const conetectMongo=require('./db');
const express = require('express')
var cors = require('cors')

conetectMongo();

const app = express()
const port = 5000
app.use(cors())

app.use(express.json())

//Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Notebook is listening on port ${port}`)
})