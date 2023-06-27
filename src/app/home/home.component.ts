import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allMighty: any[] = [];
  constructor(private _apiService: DemoService){


  }

ngOnInit(): void {
  this.getList();


}
  getList() {
    this._apiService.getBlogList().subscribe((res: any) => {
      const filteredList=res.results;
      console.log("filtered list",filteredList)

       filteredList.map((item:any)=>{
        const encodedUrl = item.blog_header_image.split('media/')[1];
        const decodedUrl = decodeURIComponent(encodedUrl);
        const modifiedUrl = decodedUrl.replace('%3A', ':');
        const data = { ...item, blog_header_image: modifiedUrl };
        this.allMighty.push(data)
      })
      console.log(res)
      this.allMighty=filteredList;
    });

  }

  // getCurrentDate(): string{
  //   const currentDate = new Date();
  //   return currentDate.toDateString();
  // }


}
