import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { AppComponent } from './app.component';
const routes: Routes = [
    
    {
        path: 'home',
        component: AppComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
  {
      path:'about', redirectTo: '/about'
  },
  {
      path:'weather', component: ContentComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }