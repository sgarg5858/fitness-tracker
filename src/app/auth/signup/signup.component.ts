import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {

  constructor(private authService:AuthService,private uiService:UiService) { }
  signupForm:FormGroup
  maxDate;
  minDate;
  uiLoadingSubscription:Subscription;
  isLoading=false;

  ngOnInit(): void {

    this.uiLoadingSubscription= this.uiService.loadingStateChanged.subscribe((res)=>{
      this.isLoading=res;
    })

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
    this.authService.registerUser({
      email:this.signupForm.value.email,
      password:this.signupForm.value.password
    })
  }
  ngOnDestroy()
  {
   if(this.uiLoadingSubscription)
   {
    this.uiLoadingSubscription.unsubscribe();
   }
  }

}
