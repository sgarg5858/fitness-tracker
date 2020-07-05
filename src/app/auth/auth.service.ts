import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private angularFireAuth:AngularFireAuth,private trainingService:TrainingService) { }
  private isAuthenticated:boolean=false;
  public authenticationStatus = new BehaviorSubject<boolean>(false);

  registerUser(authData:AuthData)
  {
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email,authData.password).then((res)=>{
      console.log(res);
      this.isAuthenticated=true;
      this.authenticationStatus.next(true);
      this.router.navigate(['/training']);
    },(err)=>{
      console.log(err);
    });
   
  }
  
  loginUser(authData:AuthData)
  {
    this.angularFireAuth.signInWithEmailAndPassword(authData.email,authData.password).then((res)=>{
      console.log(res);
      this.isAuthenticated=true;
      this.authenticationStatus.next(true);
      this.router.navigate(['/training']);
    },(error)=>{
      console.log(error);
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
