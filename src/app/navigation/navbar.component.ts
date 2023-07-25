import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  authService!: AuthService;

  constructor(authService: AuthService){
    this.authService = authService;
  }

  getuserdata(){
    console.log(this.authService.user)
  }

}
