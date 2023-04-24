import {Injectable} from '@angular/core';
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return new Promise<void>((resolve, reject) => {

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {

          let randomNumber = Math.floor(Math.random() * 1000)

          res.user?.updateProfile({
            displayName: firstName + ' ' + lastName,
            photoURL: "https://api.adorable.io/avatars/" + randomNumber
          }).then(() => {
            resolve();
          }).catch((error) => {
            reject(error);
          })
        }).catch((error) => {
        reject(error);
      })
    })
  }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
