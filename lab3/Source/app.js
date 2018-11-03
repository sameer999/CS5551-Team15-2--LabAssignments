//importing modules
var express= require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://sameer:secure@ds137703.mlab.com:37703/ase-icp9',{
    useNewUrlParser: true
});

//on connection
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo db")
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log("Error in database:"+err);
    }
});

//port no
const port = process.env.PORT || 3000

//adding middleware
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'/client/src')));

app.use('/api',route);

//testing server
app.get('/',(req,res)=>{
    res.send('server started');
});

app.listen(port,()=>{
    console.log('server started at port :'+port);
});