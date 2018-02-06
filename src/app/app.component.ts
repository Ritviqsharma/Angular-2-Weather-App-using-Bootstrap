import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import {NgForm} from '@angular/forms';
import {DataServiceService} from './data-service.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  animations: [
  
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity:0}), 
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [
        animate(500, style({opacity:0})) 
      ])
    ])
  ],
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  showHide: boolean = true;
  city: string;
  hideInput: boolean = true;
  hideContent: boolean = true;
  isHome: boolean = true;
  constructor(private data: DataServiceService, private router: Router){
    this.isItHome();
  }
  changeShowStatus(){
    this.showHide = !this.showHide;
  }
  registerLocation(form: NgForm) {
    this.city = form.value.city;
    this.data.setCity(this.city);
    this.data.setCityForecast(this.city);
  }
  changeHideInput() {
    this.hideInput = !this.hideInput;
  }
  changeHideContent() {
    this.hideContent = !this.hideContent;
  }
  redirectToWeather() {
    this.router.navigateByUrl('/weather');
  }
  isItHome() {
    if (this.router.url != '/home') {
      this.isHome = !this.isHome;
    }
  }
}
