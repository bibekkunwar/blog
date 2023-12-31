import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import jwt_decode from 'jwt-decode';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PaginationInstance } from 'ngx-pagination';
import { PaginationControlsComponent } from 'ngx-pagination';

interface DecodedType {
  user_id: number;
}

@Component({
  selector: 'app-userBlog',
  templateUrl: './userBlog.component.html',
  styleUrls: ['./userBlog.component.scss'],
})
export class UserBlogComponent implements OnInit {
  apiUrl = `https://blog-api-django-rest-framework-production.up.railway.app/api/v1/lists/`;
  postForm!: FormGroup;
  data: any;
  userId!: number;
  allBlogLists: any[] = [];
  posts: any[] | undefined;
  postId!: number;
  totalCount!: number;
  pageSize: number = 10;
  pageNo: number = 1;

  constructor(
    private _apiService: DemoService,
    private location: Location,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const encodedToken = JSON.parse(localStorage.getItem('auth_token') || '');
    const decodedToken: DecodedType = jwt_decode(encodedToken.refresh);

    this.userId = decodedToken.user_id;
    console.log(this.userId);
    this.getList(this.pageNo, this.pageSize);
  }

  getList(pageNo: number, pageSize: number) {
    this._apiService.getBlogList(pageNo, pageSize).subscribe((res: any) => {
      this.totalCount=res.count
      const filteredList = res.results.filter(
        (item: any) => item.user_id === this.userId
      );
      this.allBlogLists = filteredList;
      this.totalCount = res.count;
      // this.allBlogLists = res.results;

      /* The code block is iterating over each item in the `filteredList` array and modifying the
  `blog_header_image` property of each item. */
      // filteredList.map((item:any)=>{
      //   const encodedUrl = item.blog_header_image.split('media/')[1];
      //   const decodedUrl = decodeURIComponent(encodedUrl);
      //   const modifiedUrl = decodedUrl.replace('%3A', ':');
      //   const data = { ...item, blog_header_image: modifiedUrl };
      //    this.allBlogLists.push(data)

      // })
      // upto here


    });
  }

  back() {
    this.location.back();
  }

  createPost(item: any = {}) {
    console.log(item);
    this.postForm = new FormGroup({
      title: new FormControl(
        item.blog_title ? item.blog_title : '',
        Validators.required
      ),
      summary: new FormControl(
        item.blog_summary ? item.blog_summary : '',
        Validators.required
      ),
      description: new FormControl(
        item.blog_content ? item.blog_content : '',
        Validators.required
      ),
      image: new FormControl(
        item.blog_header_image ? item.blog_header_image : null
      ),
    });
  }

  file!: File;
  formData!: FormData;
  uploadFile(e: any) {
    this.file = e.target.files[1];
    // console.log(this.file);
  }

  addPost() {
    this.formData = new FormData();

    if (this.file) {
      this.formData.append('blog_header_image', this.file, this.file.name);
    }
    const data: any = {
      id: this.postForm.value.id,
      blog_title: this.postForm.value.title,
      blog_summary: this.postForm.value.summary,
      blog_content: this.postForm.value.description,
      user: this.userId,
    };

    if (this.postId) {
      this._apiService.updatePost(this.postId, data).subscribe((res) => {
        alert('Update successfully');
        // this.getList();
        this.router.navigate(['userBlog']);
      });
    } else {
      this._apiService.createPost(data).subscribe({
        next: (response) => {
          alert('Post registered successfully');
          this.router.navigate(['userBlog']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.error && error.error.status === 400) {
            const errorMessages = Object.values(error.error).flat().join(', ');
            alert(errorMessages || 'Enter valid details');
          } else {
            alert('An error occurred. Please try again.');
          }
        },
      });
    }
  }

  postDeleted(id: string) {
    const confirmed = confirm('are you sure? delete!!!');

    if (confirmed) {
      this._apiService.deletePost(id).subscribe({
        next: (response) => {
          alert('deleted successfully');
                },
        error: (error: HttpErrorResponse) => {
          alert(error.error.status);
        },
      });
    }
  }

  logOut(): void {
    this._apiService.logOut();
    this.router.navigate(['']);
  }
}
