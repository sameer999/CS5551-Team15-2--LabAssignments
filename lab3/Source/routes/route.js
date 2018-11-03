const express = require('express');
const router = express.Router();

const vote = require('../models/vote');
const uservote = require('../models/uservote');



//get votes
router.get('/votes',(req, res, next)=>{
    vote.find(function(err, votes){
        res.json(votes);
    })
    //res.send('Retrieving contacts');
})

//get one vote
router.get('/votes/id/:id',(req, res, next)=>{
    vote.find({_id:req.params.id}, function(err, votes){
        res.json(votes);
    })
    //res.send('Retrieving contacts');
})

//get user votes
router.get('/uservotes/:id',(req, res, next)=>{
    uservote.find({vote_id:req.params.id}, function(err, uservotes){
        res.json(uservotes);
    })
})

//add votes
router.post('/vote',(req, res, next)=>{
    let newVote = new vote({
        user_id: req.body.user_id,
        vote_title:req.body.vote_title,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,

    });
    newVote.save((err, vote)=>{
        if(err){
            res.json({msg:'failed to add vote'+err});
        }
        else{
            res.json({msg:'vote added successfully'});
        }
    });
});

//add user votes
router.post('/uservote',(req, res, next)=>{
    let newVote1 = new uservote({
        vote_id: req.body.vote_id,
        vote_title:req.body.vote_title,
        option:req.body.option,
        

    });
    newVote1.save((err, uservote)=>{
        if(err){
            res.json({msg:'failed to add vote'+err});
        }
        else{
            res.json({msg:'vote added successfully'});
        }
    });
});

//delete votes
router.delete('/vote/:id',(req, res, next)=>{
    vote.remove({_id:req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
});




module.exports = router;