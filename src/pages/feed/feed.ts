import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {MoovieProvider} from "../../providers/moovie/moovie";
import {FilmedetalhePage} from "../filmedetalhe/filmedetalhe";

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html',
    providers: [
        MoovieProvider
    ]
})
export class FeedPage {

    public nume_usuario: string = "Aleandro Ribeiro de Lima";
    public loader;
    public refresher;
    public isRefresher:boolean = false;
    public lista_filmes = new Array<any>();
    public page =1;
    public infiniteScroll;

    public obj_feed = {
        titulo: "Aleandro R Lima",
        data: "November 5, 1955",
        descricao: "Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.",
        qtd_likes: 5,
        qtd_coments: 40,
        time_coments: "11h ago"
    }

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private  movieProvider: MoovieProvider,
                public loadingCtrl: LoadingController,
                ) {
    }

    abreCarregando() {
        this.loader = this.loadingCtrl.create({
            content: 'Carregando filmes...',
        });
        this.loader.present();
    }
    fechaCarregando(){
        this.loader.dismiss();
    }

    doRefresh(refresher) {
        this.refresher = refresher;
        this.isRefresher = true;
        this.carregarFilmes();
    }

    doInfinite(infiniteScroll) {
        this.page++;
        this.infiniteScroll = infiniteScroll;
        this.carregarFilmes(true);
    }

    abrirDetalhes(filme){
        this.navCtrl.push(FilmedetalhePage, {id : filme.id});
    }


    public somaDoisNumeros(n1: number, n2: number): void {
        alert(n1 + n2);
    }

    ionViewDidEnter() {
        this.carregarFilmes();
    }

    carregarFilmes(newpage: boolean = false){
        console.log(this.page);
        //this.somaDoisNumeros(2,2);
        this.abreCarregando();

        this.movieProvider.getLastMoovie(this.page).subscribe(
            data => {
                let response = (data as any);
                const obj_retorno = (response);

                if(newpage){

                    this.lista_filmes = this.lista_filmes.concat(obj_retorno.results);
                    this.infiniteScroll.complete();
                }else{
                    this.lista_filmes = obj_retorno.results;
                }
                console.log(this.lista_filmes);

                this.fechaCarregando();
                if(this.isRefresher){
                    this.refresher.complete();
                    this.isRefresher = false;
                }

            },
            error => {
                console.log(error);
                if(this.isRefresher){
                    this.refresher.complete();
                    this.isRefresher = false;
                }
            }
        );
    }

}
