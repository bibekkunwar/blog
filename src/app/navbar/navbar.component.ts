import { Component } from '@angular/core';
import { DemoService } from '../demo.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    public authService: DemoService,
    private router: Router,
    private location: Location
    ){}

    logOut(): void {
      this.authService.logOut();
      this.router.navigate(['']);
    }




  private isLoggedIn: boolean = false;

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }


  back() {
    this.location.back();
  }


}


