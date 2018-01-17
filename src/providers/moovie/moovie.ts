import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: HttpClient) {
    console.log('Hello MoovieProvider Provider');
  }

  getLastMoovie(page){

    let x:any = `/movie/popular?page=${page}&api_key=6627f859ac3843929e8ecf636fb18a00`;
    return this.http.get(this.baseApiPath + x);

  }

  getMoovieDetail(filmeId){
    return this.http.get(this.baseApiPath + `/movie/${filmeId}?api_key=6627f859ac3843929e8ecf636fb18a00`);
  }

}
