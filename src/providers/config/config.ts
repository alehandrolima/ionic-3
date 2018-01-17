import { Injectable } from '@angular/core';

const config_key_name = "config";
@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name:"",
    userName: "",
  }

  constructor() {

  }
  // recupera dados local
  getConfigData(): any{
    return localStorage.getItem(config_key_name);
  }

  //grava dados local
  setConfigData(showSlide?:boolean, name?:string, userName?:string): any{
    let config = {
      showSlide: false,
      name:"",
      userName: "",
    }
    if(showSlide){
      config.showSlide = showSlide;
    }
    if(name){
      config.name = name;
    }
    if(userName){
      config.userName = userName;
    }
    localStorage.setItem(config_key_name,JSON.stringify(config));
  }

}
