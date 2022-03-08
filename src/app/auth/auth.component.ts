import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../core';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType: String = '';
  title: String = "";
  authForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService,
    private formBuilder: FormBuilder
    ) {
      this.authForm = this.formBuilder.group({
        'email': ['', Validators.required],
        'password': ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.route.url.subscribe({
      next: data => {
        // Get the last piece of the URL (it's either 'login' or 'register')
        this.authType = data[data.length - 1].path;
        // Set a title for the page accordingly
        this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
        // add form control for username if this is the register page
        if (this.authType === 'register') {
          this.authForm.addControl('username', new FormControl());
        }
      },
      error: err => console.error("AUTH COMPONENT: ", err)
    });
  }

  submitForm() {
    this.isSubmitting = true;
    // this.errors = {errors: {}};

    const credentials = this.authForm.value;
    if (this.authType === 'login'){
      this.userService.login(credentials.email, credentials.password).subscribe({
        next: user => {
          this.router.navigate(['/']);
        },
        error: err => {
          // this.errors = err;
          console.error("Auth Component ", err);
          this.isSubmitting = false;
        }
      });
    } else if(this.authType === 'register'){
      this.userService.register(credentials.username, credentials.email, credentials.password).subscribe({
        next: user => {
          this.router.navigate(["/"]);
        },
        error: err => {
          console.error("Auth Component ", err);
          this.isSubmitting = false;
        }
      });
    }
  }
  
}
