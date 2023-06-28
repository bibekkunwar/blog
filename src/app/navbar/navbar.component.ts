import { Component } from '@angular/core';
import { DemoService } from '../demo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    public authService: DemoService,
    private router: Router
    ){}

    logOut(): void {
      this.authService.logOut();
      this.router.navigate(['']);
    }
}


