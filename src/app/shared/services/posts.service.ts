import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Ipost } from '../model/data';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl : string = 'https://http2-20541-default-rtdb.firebaseio.com/';


  constructor(private _http : HttpClient) { }


  createPost(post : Ipost){
    let fetchUrl : string = `${this.baseUrl}/post.json`;
    return this._http.post(fetchUrl, post)
  }
  fetchPost(){
    let fetchUrl : string = `${this.baseUrl}/post.json`;
    return this._http.get(fetchUrl)
                        .pipe(
                          map((data) => {
                            let mapArr : Ipost[] = []
                            if(data){
                              Object.entries(data).forEach(([key, value]) =>{
                                mapArr.push({...value, id : key})
                              })
                            }
                            return mapArr;
                          })
                          )
  }
  updatePost(p: Ipost, id: string){
    let updatUrl : string = `${this.baseUrl}/post/${id}.json`;
    return this._http.patch(updatUrl, p)
  }

  deletePost(post : Ipost){
    let deleteUrl =`${this.baseUrl}/post/${post.id}.json`;
    return this._http.delete(deleteUrl);
  }

}
