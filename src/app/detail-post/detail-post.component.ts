import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from '../demo.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit{
  post: any;
  postId!: number;
  viewAll: any;


  constructor(
    private route: ActivatedRoute,
    private _apiService: DemoService
  ) {}

  ngOnInit(): void {
    this.postId = +this.route.snapshot.params['postId'];
    console.log(this.postId);
    this.viewPost();
  }

  viewPost() {
    this._apiService.getPostDetailById(this.postId)
    .subscribe((res:any)=> {
      const allPost = res;
      console.log(allPost)
      this.viewAll = allPost;
    })
  }


  }






