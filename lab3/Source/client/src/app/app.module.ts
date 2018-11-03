import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VotesComponent } from './votes/votes.component';
import { FormsModule } from '@angular/forms';
import { VoteService } from './vote.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AuthService } from './providers/auth.service';
import { from } from 'rxjs';
import { UserComponent } from './user/user.component';
//import { LoginpageComponent } from './loginpage/loginpage.component';

export const firebaseconfig = {
  apiKey: "AIzaSyBUMKqxYc_p7A16y7LM0ISHjo4Wf9V43IQ",
    authDomain: "icp7-a24ba.firebaseapp.com",
    databaseURL: "https://icp7-a24ba.firebaseio.com",
    projectId: "icp7-a24ba",
    storageBucket: "icp7-a24ba.appspot.com",
    messagingSenderId: "923089293320"
}

@NgModule({
  declarations: [
    AppComponent,
    VotesComponent,
    UserComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
