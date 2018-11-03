const mongoose =require('mongoose');

const voteschema = mongoose.Schema({
    
    user_id:{
        type:String,
        required: true
    },
    vote_title:{
        type: String,
        required: true
    },
    option1:{
        type: String,
        required: true
    },
    option2:{
        type: String,
        required: true
    },
    option3:{
        type: String,
        required: false
    },
    option4:{
        type: String,
        required: false
    },
});


const votes = module.exports = mongoose.model('vote',voteschema);
