import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'show/:id', component: ShowComponent},
  {path: '**', redirectTo: 'home'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
