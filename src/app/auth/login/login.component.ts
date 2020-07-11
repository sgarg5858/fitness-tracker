import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm:FormGroup;
  constructor(private authService:AuthService,private router:Router,private uiService:UiService) { }
  loading=false;
  uiLoadingSubscription:Subscription;
  ngOnInit(): void {
   this.uiLoadingSubscription= this.uiService.loadingStateChanged.subscribe((res)=>{
      this.loading=res;
    })
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
  ngOnDestroy()
  {
    if( this.uiLoadingSubscription)
    {
      this.uiLoadingSubscription.unsubscribe();

    }
  }
}
