import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import jwt_decode from 'jwt-decode';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { CreatePost } from '../data';

interface DecodedType {
  user_id: number;
}

@Component({
  selector: 'app-userBlog',
  templateUrl: './userBlog.component.html',
  styleUrls: ['./userBlog.component.css'],
})
export class UserBlogComponent implements OnInit {
  postForm!: FormGroup;
  data: any;
  userId!: number;
  allBlogLists: any[] = [];
  constructor(private _apiService: DemoService, private location: Location, private router: Router) {}

  ngOnInit() {
    const encodedToken = JSON.parse(localStorage.getItem('auth_token') || '');

    const decodedToken: DecodedType = jwt_decode(encodedToken.refresh);
    this.userId = decodedToken.user_id;
    this.getList();
    this.createPost();

  }

  getList() {
    this._apiService.getBlogList().subscribe((res: any) => {
      const filteredList = res.results.filter(
        (item: any) => item.user_id === this.userId
      );
      this.allBlogLists = filteredList;
    });
  }

  back() {
    this.location.back();
  }

  createPost() {
    this.postForm = new FormGroup({
      title: new FormControl(''),
      summary: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(null),
    });
  }

  file!: File;
  formData!: FormData;
  uploadFile(e: any) {
    this.file = e.target.files[0];
    console.log(this.file);
  }

  addPost() {
    this.formData = new FormData();
    // ... Append other form values

    if (this.file) {
      this.formData.append('blog_header_image', this.file, this.file.name);
    }
    const data: any = {
      blog_title: this.postForm.value.title,
      blog_summary: this.postForm.value.summary,
      blog_content: this.postForm.value.description,
      // blog_header_image: this.file,
      user: this.userId,
    };

    this._apiService.createPost(data).subscribe((res) => {
      console.log(res);
    });
  }

  logOut(): void {
    this._apiService.logOut();
    this.router.navigate(['/']);
  }
}
