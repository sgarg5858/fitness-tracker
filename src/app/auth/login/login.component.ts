import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private authService:AuthService,private router:Router) { }
  

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
     
    })
  }
  onSubmit()
  {
    console.log(this.loginForm);
    this.authService.loginUser({
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    });
    this.router.navigate(['training']);
  }
}
