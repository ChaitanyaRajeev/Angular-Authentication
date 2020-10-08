const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3000
const api = require('./routes/api');
const app = express()

app.use(bodyParser.json());
app.use(cors());
app.get('/',function(req,res){
    res.send("helo");
})
app.use('/api',api);

app.listen(PORT,function(){
    console.log('Running on'+PORT);
})