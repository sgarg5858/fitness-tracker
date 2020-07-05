import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  constructor(private authService:AuthService) { }
  @Output() public closeSideNav= new EventEmitter<void>();
  isAuthenticated=false;
  authenicatedSubscription:Subscription

  ngOnInit(): void {
    this.authenicatedSubscription=this.authService.authenticationStatus.subscribe((res)=>{
      this.isAuthenticated=res;
    })
  }
  onLogout()
  {
    this.authService.logout();
    this.onClose();
  }
  onClose()
  {
    this.closeSideNav.emit();
  }

}
