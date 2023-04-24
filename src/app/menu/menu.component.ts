import {Component} from '@angular/core';
import firebase from "firebase/app";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  loggedIn: boolean = false;
  user: any;

  constructor() {
    this.user = firebase.auth().currentUser;

    if (this.user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }

    })

  }

  logout() {
    firebase.auth().signOut();
  }
}
