import { Component, OnInit,EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  @Output() public sideNavToggle= new EventEmitter<void>();
  isAuthenicated:boolean=true;
  authenticationSubscription:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
   this.authenticationSubscription= this.authService.authenticationStatus.subscribe((response)=>{
      this.isAuthenicated=response;
    })
  }

  onToggle()
  {
    this.sideNavToggle.emit();
  }
  onLogout()
  {
    this.authService.logout();
  }
  ngOnDestroy()
  {
    this.authenticationSubscription.unsubscribe();
  }
}
