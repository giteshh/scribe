import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SignupComponent} from './signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";

import firebase from 'firebase/app';
import { LoginComponent } from './login/login.component';
import { CapitalizePipe } from './capitalize.pipe';
import { HomeComponent } from './home/home.component';
import { SalutationPipe } from './salutation.pipe'
import {AuthService} from "./auth.service";
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';



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
    LoginComponent,
    CapitalizePipe,
    HomeComponent,
    SalutationPipe,
    MenuComponent,
    MyblogsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
