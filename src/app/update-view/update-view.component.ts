import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileRepository, UploadAdapter, FileLoader } from '@ckeditor/ckeditor5-upload/src';




interface DecodedType {
  user_id: number;

}


@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.scss'],
})
export class UpdateViewComponent implements OnInit {
  public postForm!: FormGroup;
  allMighty: any;
  public Editor = ClassicEditor;
  data: any;
  userId!: number;
  allBlogLists: any[] = [];
  posts: any[] | undefined;
  postId!: number;
  constructor(
    private _apiService: DemoService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  )



  {}

  ngOnInit(): void {

    const encodedToken = JSON.parse(localStorage.getItem('auth_token') || '');

    const decodedToken: DecodedType = jwt_decode(encodedToken.refresh);
    this.userId = decodedToken.user_id;
    this.getList();

    this.postId = +this.route.snapshot.params['postId'];
    console.log(this.postId);
    this.createPost();
    if (this.postId) {
      this._apiService.getPostDetailById(this.postId).subscribe((res) => {
        this.createPost(res);
      });
    }
  }

  createPost(item: any = {}) {
    console.log("item",item);
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
        item.blog_header_image ? item.blog_header_image : ''
      ),
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

    console.log(this.formData);
    if (this.file) {
      this.formData.append('blog_header_image', this.file, this.file.name);
    }
    const data: any = {
      id: this.postForm.value.id,
      blog_title: this.postForm.value.title,
      blog_summary: this.postForm.value.summary,
      blog_content: this.postForm.value.description,
      // blog_header_image: this.postForm.value.image,
      user: this.userId,
    };

    console.log("data",data);

    if (this.postId) {
      // update api
      this._apiService.updatePost(this.postId, data).subscribe((res) => {
        alert('Üpdate successfully');
        this.router.navigate(['userBlog'])
        this.getList();
      });
    }
    else{
      this._apiService.createPost(data).subscribe({
        next: (response) => {
          alert('Post registered successfully');
          this.getList();
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

  getList() {
    this._apiService.getBlogList().subscribe((res: any) => {
      const allList = res.results;
      console.log(res);
      this.allMighty = allList;
    });
  }




  back() {
    this.location.back();
  }

  logOut(): void {
    this._apiService.logOut();
    this.router.navigate(['']);
  }




}
