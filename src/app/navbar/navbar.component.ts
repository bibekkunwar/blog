import { Component } from '@angular/core';
import { DemoService } from '../demo.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public authService: DemoService){}
}


