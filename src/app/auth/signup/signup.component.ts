import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }
  signupForm:FormGroup
  maxDate;
  minDate;

  ngOnInit(): void {
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 10);
    this.minDate=new Date();
    this.minDate.setFullYear(this.maxDate.getFullYear() - 90);
    this.signupForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]),
      dob:new FormControl(null,[Validators.required]),
      agreement:new FormControl(null,[Validators.required])
    })
  }

  onSubmit()
  {
    console.log(this.signupForm);
  }
}
