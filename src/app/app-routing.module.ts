import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'show/:type/:id', component: ShowComponent},
  {path: 'search', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'home'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
