import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Post{
  id: number;
  title:string;
  body:string
  userId:number;
}

export interface Commment{
  postId: number;
  id:number;
  name:string;
  email:string;
  body:string
}
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient)
  private postLink = `https://jsonplaceholder.typicode.com/posts`
  private commentLink = 'https://jsonplaceholder.typicode.com/comments'


  getPost(){
    return this.http.get<Post[]>(this.postLink)
  }
  getComment(){
    return this.http.get<Commment[]>(this.commentLink)
  }
}
