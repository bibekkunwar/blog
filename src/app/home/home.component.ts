import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allMighty: any;
  constructor(private _apiService: DemoService){}

ngOnInit(): void {
  this.getList();
}
  getList() {
    this._apiService.getBlogList().subscribe((res: any) => {
      const allList=res.results;
      console.log(res)
      this.allMighty=allList;
    });
  }
}
