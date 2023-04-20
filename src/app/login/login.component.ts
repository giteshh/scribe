import {Component} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import firebase from "firebase";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  message: string = '';
  userError: any;


  constructor(public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit(loginForm: any) {
    let email: string = this.loginForm.value.email;
    let password: string = this.loginForm.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        this.message = "You have been logged in successfully."

      }).catch((error) => {
      console.log(error);
      this.userError = error;
    })
  }

}
