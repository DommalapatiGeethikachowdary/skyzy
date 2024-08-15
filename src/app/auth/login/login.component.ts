import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  otpForm: FormGroup;
  errMsg: string[] = [];
  showOTP: boolean = false;
  correctOTP: string = '6784'; // Define the correct OTP here

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mobilenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.otpForm = this.fb.group({
      OTP: ['', Validators.required]
    });
  }

  onMobileSubmit(): void {
    this.errMsg = []; // Clear previous error messages

    if (this.loginForm.valid) {
      this.showOTP = true;
    } else {
      this.errMsg.push("Invalid mobile number");
    }
  }

  onOTPSubmit(): void {
    this.errMsg = []; // Clear previous error messages

    if (this.otpForm.valid) {
      const enteredOTP = this.otpForm.get('OTP')?.value;
      if (enteredOTP === this.correctOTP) {
        // Handle successful OTP submission
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['home']);
        alert('Login Successfully');
        this.showOTP = false; // Reset to initial state
      } else {
        // Handle incorrect OTP
        this.errMsg.push("Invalid OTP");
      }
    } else {
      // Handle validation issues
      this.errMsg.push("Please enter a valid OTP");
    }
  }
}




  // onSubmit() {
  //   localStorage.setItem('isLoggedin', 'true')
  //   this.router.navigate(['home'])
  //   console.log(this.loginForm.value);
  //   this.loginForm.reset();
  //   alert('Login Successfully');yyyy
  // }

