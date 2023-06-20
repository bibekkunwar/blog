import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.scss']
})
export class UpdateViewComponent implements OnInit{

  postForm!: FormGroup;
  allMighty: any;
  constructor(private _apiService: DemoService, private location: Location){}

ngOnInit(): void {
  this.getList();
}
  getList() {
    this._apiService.getBlogList().subscribe((res: any) => {
      const allList=res.results;
      console.log(res);
      this.allMighty=allList;
    });
  }

  getCurrentDate(): string{
    const currentDate = new Date();
    return currentDate.toDateString();
  }

  back() {
    this.location.back();
  }

  postUpdate(id:string) {
    this._apiService.updatePost(id).subscribe({
      next: response => {
alert('post updated successfully')
      }
    })
  }
}
