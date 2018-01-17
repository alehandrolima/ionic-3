import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MoovieProvider} from "../../providers/moovie/moovie";

/**
 * Generated class for the FilmedetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filmedetalhe',
  templateUrl: 'filmedetalhe.html',
  providers:[
      MoovieProvider
  ]
})
export class FilmedetalhePage {
  public filme;
  public filmeId;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public movieProvider: MoovieProvider,
  ) {
  }

  ionViewDidEnter() {
    this.filmeId = this.navParams.get("id");
    this.movieProvider.getMoovieDetail(this.filmeId).subscribe(
        data=>{
          let retorno = (data as any);
          this.filme = retorno;
        },
        error=>{
          console.log(error);
        }
    );
  }

}
