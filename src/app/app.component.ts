import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase/app';

// auth from firebase is also needed
import 'firebase/auth';
import { HomePage } from '../pages/home/home';
import { firebaseConfig } from './firebase_credentials';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      firebase.initializeApp(firebaseConfig);

              // it runs everytime someone opens it
              const unsubscribe = firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                  this.rootPage = 'LoginPage';
              
                  // unsubscribe user from this event listener
                  unsubscribe();
                } else {
                  this.rootPage = HomePage;
                  unsubscribe();
                }
              });
              
    });


  }
  
  

  
}

