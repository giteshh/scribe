import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SignupComponent} from './signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";

import firebase from 'firebase/app';
import { LoginComponent } from './login/login.component'



let firebaseConfig = {
  apiKey: "AIzaSyA3StwzJvkb-isawrtDbWBgs4c_RA_QdUk",
  authDomain: "app-scribe.firebaseapp.com",
  projectId: "app-scribe",
  storageBucket: "app-scribe.appspot.com",
  messagingSenderId: "975342904491",
  appId: "1:975342904491:web:a7175502ccc220bd2143ee",
  measurementId: "G-34TGXQQXPC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
