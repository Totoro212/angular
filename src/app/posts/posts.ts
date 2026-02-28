import { Component, inject, signal, computed } from '@angular/core';
import { Post, PostService } from '../services/post-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  private router = inject(Router)
  private postService = inject(PostService)
  protected posts = signal<Post[]>([])
  public postId = signal('')

  constructor(){
    this.postService.getPost().subscribe({
      next: (data) => this.posts.set(data),
      error: (error) => console.error(error)
    });
  }
  showDetails(id:number){
    this.router.navigate(['post-details', id])
  }
}