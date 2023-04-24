import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  message: string = '';
  userError: any;


  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router) {

    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit(loginForm: any) {
    let email: string = this.loginForm.value.email;
    let password: string = this.loginForm.value.password;

    this.authService.login(email, password)
      .then((data) => {
        console.log(data);
        this.message = "You have been logged in successfully."
        this.router.navigate(['/myblogs']);

      }).catch((error) => {
      console.log(error);
      this.userError = error;
    })
  }

}
