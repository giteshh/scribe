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

import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import firebase from "firebase/app";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm: FormGroup;
  userError: any;
  message: string = "";
  options: AbstractControlOptions = {
    validators: this.checkIfMatchingPassword
  };


  constructor(private fb: FormBuilder,
              public authService: AuthService,
              public router: Router) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, this.options)

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

    this.authService.signup(email, password, firstName, lastName).then((user: any) => {

      firebase.firestore().collection("users").doc(user.uid).set({
        firstName: signUpForm.value.firstName,
        lastName: signUpForm.value.lastName,
        email: signUpForm.value.email,
        photoURL: user.photoURL,
        interests: "",
        bio: "",
        hobbies: ""
      }).then(() => {
        this.message = "You have been signed up successfully.";
        this.userError = null;
        this.router.navigate(['/myblogs'])
      })


    }).catch((error) => {
      console.log(error);
      this.userError = error;
    })

  }
}
