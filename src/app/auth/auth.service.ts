import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router:Router,
    private angularFireAuth:AngularFireAuth,
    private trainingService:TrainingService,
    private uiService:UiService
    ) { }
  private isAuthenticated:boolean=false;
  public authenticationStatus = new BehaviorSubject<boolean>(false);

  registerUser(authData:AuthData)
  {
    this.uiService.loadingStateChanged.next(true);
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email,authData.password).then((res)=>{
      this.uiService.loadingStateChanged.next(false);
      console.log(res);
      this.isAuthenticated=true;
      this.authenticationStatus.next(true);
      this.router.navigate(['/training']);
    },(err)=>{
      this.uiService.loadingStateChanged.next(false);
      console.log(err);
      this.uiService.showSnackbar(err.message,null,3000);
    });
   
  }
  
  loginUser(authData:AuthData)
  {
    this.uiService.loadingStateChanged.next(true);
    this.angularFireAuth.signInWithEmailAndPassword(authData.email,authData.password).then((res)=>{
      console.log(res);
      this.uiService.loadingStateChanged.next(false);
      this.isAuthenticated=true;
      this.authenticationStatus.next(true);
      this.router.navigate(['/training']);
    },(err)=>{
      this.uiService.loadingStateChanged.next(false);
      console.log(err);
      this.uiService.showSnackbar(err.message,null,3000);
    });
  }
  logout()
  {
    this.trainingService.cancelSubscriptions();
    this.angularFireAuth.signOut();
    this.isAuthenticated=false;
    this.authenticationStatus.next(false);
    this.router.navigate(['/login']);
  }
  isAuth()
  {
    return  this.isAuthenticated;
  }
}
