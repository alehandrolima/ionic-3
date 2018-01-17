import {Component, ViewChild} from '@angular/core';
import {Platform, ModalController, Nav, MenuController, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { TabsPage } from '../pages/tabs/tabs';
import {IntroPage} from "../pages/intro/intro";
import {ConfigProvider} from "../providers/config/config";
import {SplashPage} from "../pages/splash/splash";
import {ContactPage} from "../pages/contact/contact";
import {FeedPage} from "../pages/feed/feed";
import {HomePage} from "../pages/home/home";
import {SobrePage} from "../pages/sobre/sobre";
import {ConfiguracoesPage} from "../pages/configuracoes/configuracoes";
import {IonMaterialSidemenuOptions} from "./ion-material-sidemenu";

@Component({
  templateUrl: 'app.html',
  providers:[
      ConfigProvider,

  ]
})
export class MyApp {
  //
  @ViewChild(Nav) nav: Nav;

  rootPage:any ;
  //rootPage:any = TabsPage;
  menuOptions: IonMaterialSidemenuOptions;
  constructor(
      platform: Platform,
      statusBar: StatusBar,
      configProvider: ConfigProvider,
      modalCtrl: ModalController,
      public menuCtrl: MenuController,
      public events: Events,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      let config = configProvider.getConfigData();
      if (config == null){
        this.rootPage = IntroPage;
        configProvider.setConfigData(false);
      }else{
        this.rootPage = TabsPage;
      }
      console.log(config);
      statusBar.styleDefault();
      //splashScreen.hide();
      let splash = modalCtrl.create(SplashPage);
      splash.present();
    });

    let _t = this; //keep a reference

    // initialize the menu
    this.menuOptions = {
      header: {
        background: '#ccc url(./assets/imgs/faex.jpg) no-repeat top left / cover',
        picture: './assets/imgs/img-perfil.jpeg',
        username: 'Nikolas Thaylor Andrade Ferreira',
        email: 'Análise e Desenvolvimento de Sistemas',
      },
      entries: [
        { isSelected: true, title: 'Página Inicial', leftIcon: 'home', onClick: () => { _t.nav.setRoot(HomePage) } },
        { title: 'Acadêmico', leftIcon: 'bookmarks', onClick: () => { _t.nav.setRoot(SobrePage) } },
        { title: 'Financeiro', leftIcon: 'logo-usd', onClick: () => { _t.nav.setRoot(ContactPage) } },
        { title: 'Biblioteca', leftIcon: 'book', onClick: () => { _t.nav.setRoot(FeedPage) } },
        { title: 'Calendário', leftIcon: 'calendar', onClick: () => { _t.nav.setRoot(ConfiguracoesPage) } },
        { title: 'Materiais', leftIcon: 'create', onClick: () => { _t.nav.setRoot(FeedPage) } },
        { isDivider: true },
        { title: 'Sair', leftIcon: 'exit', onClick: () => { _t.nav.setRoot(HomePage) } },
      ]
    };
  }
}
