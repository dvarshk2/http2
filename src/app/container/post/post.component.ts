import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ipost } from 'src/app/shared/model/data';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  baseUrl : string = 'https://http2-20541-default-rtdb.firebaseio.com/';
  postArr : Ipost[] =[];
@ViewChild('postForm') postForm! : NgForm;
  isUpdating : boolean = false;
  constructor(private _postsService : PostsService) { }

  ngOnInit(): void {
    this.getPost();
  }
  onSubmit(post : Ipost){
    console.log(post);  
    this._postsService.createPost(post)
                        .subscribe(res => {
                          console.log(res) //res >>{name: '-N8dDUSFgm8eXPRZNbKh'}
                          this.postArr.push(post);
                        }
                        )  
  }
  getPost(){
    this._postsService.fetchPost()
    .subscribe(res => {
      console.log(res)
      this.postArr =res;
    })
  }
  onEdit(p : Ipost){
    this.isUpdating = !this.isUpdating;
    if(p.id){
      localStorage.setItem('setId', p.id);
    }
    this.postForm.setValue({
      title : p.title,
      content : p.content
    })
  }
  onUpdate(){
    let getId = localStorage.getItem('setId');
    let obj = {
      title : this.postForm.value.title,
      content : this.postForm.value.content
    }
    if(getId){
      this._postsService.updatePost(obj, getId)
                          .subscribe(res => {
                            console.log(res);
                            this.postArr.forEach(ele => {
                              if(ele.id === getId){
                                ele.title = obj.title;
                                ele.content = obj.content;
                              }
                            })
                          }
                          )
                          this.postForm.reset();
                          this.isUpdating = !this.isUpdating;
    }

  }
  onDelete(p : Ipost){
    this._postsService.deletePost(p)
                        .subscribe(() => {
                         this.postArr= this.postArr.filter(ele => ele.id != p.id)
                        })
  }
  
}
