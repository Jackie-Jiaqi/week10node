let mongoose = require('mongoose');
let express = require('express');
let app = express();
let mongodb = require('mongodb');
let morgan = require('morgan');
let actorRouter = require('./routers/actor');
let movieRouter = require('./routers/movie');
let cors = require('cors');
// let Actor = require('./models/actor');
// let Movie = require('./models/movie');
app.use(express.urlencoded({extended:true}));
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/movies',function(err){
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
app.use(cors());
app.use('/actor',actorRouter);
app.use('/movie',movieRouter);

app.listen('8080',()=>{
    console.log('server start.');
})