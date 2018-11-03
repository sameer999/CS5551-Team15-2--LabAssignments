import { Component, OnInit } from '@angular/core';
import { VoteService} from '../vote.service';
import { VotesComponent } from '../votes/votes.component'
import {Vote} from '../vote';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [VoteService],
  
})

export class UserComponent implements OnInit {

  votes: Vote[];
  vote: Vote;
  vote_id: string;
  vote_title: string;
  option: string;


  constructor(private VoteService: VoteService) { }

  adduserVote(){
    //console.log("addvote called");
    const newVote1 = {
      vote_id: this.vote_id,
      vote_title: this.vote_title,
      option: this.option,
    }
    this.VoteService.adduserVote(newVote1);
    
    
  }

  getVote(id){
    this.VoteService.getoneVote(id)
    .subscribe( votes => this.votes = votes);
  }



  ngOnInit() {
    this.VoteService.getoneVote('5bd2964eebc73720f8e262c9')
    .subscribe( votes => this.votes = votes);
  }

}
