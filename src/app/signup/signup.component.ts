import {Component} from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";

import firebase from 'firebase/app'
import 'firebase/auth';
import {last} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  userError: any;
  message: string = "";
  options: AbstractControlOptions = {
    validators: this.checkIfMatchingPassword
  };
  signUpForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  }, this.options)

  constructor(private fb: FormBuilder) {

  }

  checkIfMatchingPassword(form: AbstractControl): ValidationErrors | null {
    if (form.get("password")?.value != form.get("confirmPassword")?.value) {
      return {
        "notEqualToPassword": true,
      };
    }
    return null;
  }

  onSubmit(signUpForm: any) {
    let email: string = signUpForm.value.email;
    let password: string = signUpForm.value.password;
    let firstName: string = signUpForm.value.firstName;
    let lastName: string = signUpForm.value.lastName;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
      console.log(response);

      let randomNumber = Math.floor(Math.random() * 1000);

      response.user?.updateProfile({
        displayName: firstName + '' + lastName,
        photoURL: "https://api.adorable.io/avatars" + randomNumber
      }).then(() => {
        this.message = "You have been signed up successfully. Please login."
      })
    }).catch((error) => {
      console.log(error);
      this.userError = error;
    })
  }
}
