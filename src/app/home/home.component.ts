import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Blog, BlogListResponse } from '../data';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allMighty: Blog[] = [];
  pageNo: number = 1;
  blogs: Blog[] = [];
  count: number = 0;
  nextLink: string = '';
  previousLink: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  totalPagesArray: number[] = [];
  totalCount!: number;
  id!:number;

  constructor(private _apiService: DemoService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getList(this.pageNo, this.pageSize);
    // this.loadBlogs();
  }


  getList(pageNo: number, pageSize: number) {
    this.allMighty = [];
    this._apiService.getBlogList(pageNo, pageSize).subscribe((res: any) => {
      this.totalCount = res.count;
      this.allMighty = res.results;
      console.log(this.allMighty)
      this.id = res.id;
      // const filteredList = res.results;
      // const allList = res.results;


      // filteredList.map((item: any) => {
      //   const encodedUrl = item.blog_header_image.split('media/')[1];
      //   const decodedUrl = decodeURIComponent(encodedUrl);
      //   const modifiedUrl = decodedUrl.replace('%3A', ':');
      //   const data = { ...item, blog_header_image: modifiedUrl };
      //   this.allMighty.push(data);
      // });
      // this.allMighty = allList;
      // this.allMighty = filteredList;
    });
  }
}
