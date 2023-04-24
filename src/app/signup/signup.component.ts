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
              public authService: AuthService) {
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

    this.authService.signup(email, password, firstName, lastName).then(() => {

      this.message = "You have been signed up successfully. Please login."
    }).catch((error) => {
      console.log(error);
      this.userError = error;
    })
  }
}
