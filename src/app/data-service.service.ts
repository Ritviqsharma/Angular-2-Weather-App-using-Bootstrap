import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { WeatherData } from './weather';
import {HttpClient, HttpResponse} from "@angular/common/http";
import 'rxjs/add/operator/map';
@Injectable()
export class DataServiceService {
  city: string;
  cities: string[];
  isNull: boolean = false;
  private url = "";
  private url2 = "";
  response: Response;
  setCity(city) {
    this.city = city;
    this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&APPID=e1329f1db141a3e23dfb479f5a89aeab";
  }
  setCityForecast(city) {
    this.city = city;
    this.url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + this.city + "&APPID=e1329f1db141a3e23dfb479f5a89aeab";
  }
  constructor(private http: HttpClient) { } 
  getWeather(): Observable<WeatherData> {
    return this.http.get<WeatherData>(this.url).map(data => {
      return data;
    });
  } 
  getForecast(): Observable<any>{
    return this.http.get<any>(this.url2).map(data => {
      return data;
    });
  } 
  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
} 
  private extractData(res: Response) {
    let body = res.json();
    return body;
} 
}
