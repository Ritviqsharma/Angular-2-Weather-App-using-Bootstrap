import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { WeatherData } from './weather';
import { CommonModule, Location } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { PlatformLocation } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
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
  ]
})
export class ContentComponent implements OnInit {
  currentWeather: WeatherData;
  weatherForecast: any;
  isNull: boolean = false;
  clouds: boolean = false;
  rain: boolean = false;
  thunder: boolean = false;
  snow: boolean = false; 
  clear: boolean = false;
  none: boolean = false;
  celsius: number;
  pressure: number;
  options: Object;
  forecastData: Object[] = [];
  firstDate: Date;
  constructor(private weatherData: DataServiceService, private location: Location, platform: PlatformLocation) {
    
    platform.onPopState(() => {

      this.location.go('home');
    });
    
   }

  ngOnInit() {
    this.getWeather();
    this.getForecast();
    $(document).ready(function() {
      $(".leftButton").on("click", function() {
        var pos = $(".lastBox").offset().left;
        $('#info').animate({
            scrollLeft: -250
        }, 1500);
    });
    $(".rightButton").on("click", function() {
        var pos = $(".firstBox").offset().left;

        $('#info').animate({
            scrollLeft: 250
        }, 1500);
    });
    });
  }

  
  getWeather() {
    this.weatherData.getWeather().subscribe(currentWeather => {
      this.currentWeather = currentWeather;
      console.log(currentWeather);
    }, error => {
        this.isNull = !this.isNull;
    },
  () => {
    this.calculateCelsius(this.currentWeather.main.temp);
    this.isStorm(this.currentWeather);
    this.isClouds(this.currentWeather);
    this.isRain(this.currentWeather);
    this.isSnow(this.currentWeather);
    this.isClear(this.currentWeather);
    this.isNone(this.currentWeather);
    this.calculatePressure(this.currentWeather.main.pressure);
  });
  }

  getForecast() {
    this.weatherData.getForecast().subscribe(weatherForecast => {
      console.log(weatherForecast);
      this.weatherForecast = weatherForecast;
    }, error => {},
    () => {
      for (var i:number = 0; i < this.weatherForecast.list.length; i++) {
        var tempObj:Object = {
          y: this.returnCelsius(this.weatherForecast.list[i].main.temp),
          fillColor: "blue"
        }
        this.forecastData.push(tempObj);
      }
      console.log((this.forecastData));
      var d = new Date(this.weatherForecast.list[0].dt * 1000);
      this.options = {
        chart: {
          type: 'line',
          backgroundColor: null
        },
        title : { text : '5 Day Forecast' },
        yAxis: {
          title: {text: 'Temperature'}
        },
        
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            day: '%b, %H:%M'
          },
        },
        plotOptions: {
          series: {
              pointStart: Date.UTC(d.getFullYear(), d.getMonth(), d.getDay(),d.getHours(), d.getMinutes()),
              pointInterval: 3 * 3600 * 1000 // one day
          }
      },
        series: [{
            color: 'blue',
            name: 'Temperature',
            data: this.forecastData,
            lineWidth: 2,
            
        }]
    };
    });
  }
  goBack() {
    this.location.back();
  }
  isClouds(currentWeather) {
    if (currentWeather.weather[0].main == "Clouds") {
      this.clouds = !this.clouds;
    } 
  }
  isStorm(currentWeather) {
    if (currentWeather.weather[0].main == "Thunderstorm") {
      this.thunder = !this.thunder;
    } 
  }
  isSnow(currentWeather) {
    if (currentWeather.weather[0].main == "Snow") {
      this.snow = !this.snow;
    } 
  }
  isRain(currentWeather) {
    if (currentWeather.weather[0].main == "Rain" || currentWeather.weather[0].main == "Drizzle") {
      this.rain = !this.rain;
    } 
  }
  isClear(currentWeather) {
    if (currentWeather.weather[0].main == "Clear") {
      this.clear = !this.clear;
    } 
  }
  isNone(currentWeather) {
    if (this.thunder || this.clouds || this.rain || this.snow) {
    } else {
      this.none = !this.none;
    }
  }
  calculateCelsius(fn) {
    this.celsius = Math.round(fn - 273.15);
  }
  returnCelsius(fn):number {
    var temp:number = Math.round(fn - 273.15);
    return temp;
  }
  calculatePressure(hpa) {
    this.pressure = hpa / 10;
  }
}
