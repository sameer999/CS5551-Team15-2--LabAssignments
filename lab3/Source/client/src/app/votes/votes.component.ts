import { Component, OnInit } from '@angular/core';
import { VoteService} from '../vote.service';
import {Vote} from '../vote';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css'],
  providers: [VoteService]
})
export class VotesComponent implements OnInit {
  votes: Vote[];
  vote: Vote;
  user_id: string;
  vote_title: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;

  constructor(private VoteService: VoteService) { }

  addVote(){
    //console.log("addvote called");
    const newVote = {
      user_id: this.user_id,
      vote_title: this.vote_title,
      option1: this.option1,
      option2: this.option2,
      option3: this.option3,
      option4: this.option4
    }
    this.VoteService.addVote(newVote)
    .subscribe(vote =>{
      console.log(newVote);
      this.votes.push(vote);
      this.VoteService.getVotes()
    .subscribe( votes => this.votes = votes);
    });
    
  }

  deleteVote(id:any)
  {
    var votes = this.votes;
    this.VoteService.deleteVote(id)
    .subscribe(data =>{
      if(data.n==1)
      {
        for(var i=0; i< this.votes.length; i++)
        {
         if(votes[i]._id == id){
           votes.splice(i,1);
         } 
        }
      }
    });
  }

  ngOnInit() {

    this.VoteService.getVotes()
    .subscribe( votes => {this.votes = votes});
  }

}
