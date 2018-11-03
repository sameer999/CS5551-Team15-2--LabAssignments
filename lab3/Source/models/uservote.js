const mongoose =require('mongoose');

const uservoteschema = mongoose.Schema({
    vote_id:{
        type: String,
        required: true
    },
    vote_title:{
        type: String,
        required: true
    },
    option:{
        type: String,
        required: true
    },
    
});


const uservotes = module.exports = mongoose.model('uservote',uservoteschema);
