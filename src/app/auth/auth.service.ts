import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }
  private user:User;
  public authenticationStatus = new BehaviorSubject<boolean>(false);

  registerUser(authData:AuthData)
  {
     this.user={
       email:authData.email,
       userId:Math.round(Math.random() * 10000).toString()
     }
     this.authenticationStatus.next(true);
     this.router.navigate(['/training']);
  }
  
  loginUser(authData:AuthData)
  {
    this.user={
      email:authData.email,
      userId:Math.round(Math.random() * 10000).toString()
    }
    this.authenticationStatus.next(true);
    this.router.navigate(['/training']);
  }
  logout()
  {
    this.user=null;
    this.authenticationStatus.next(false);
    this.router.navigate(['/login']);
  }
  getUser()
  {
    return { ...this.user };
  }
  isAuth()
  {
    return  this.user != null;
  }
}
