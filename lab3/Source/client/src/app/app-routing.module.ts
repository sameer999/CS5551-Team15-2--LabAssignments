import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotesComponent } from './votes/votes.component';
import { UserComponent } from './user/user.component';
//import { LoginpageComponent } from './loginpage/loginpage.component';

const routes: Routes = [
  {path:"", component: VotesComponent},
  {path:"user",component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
