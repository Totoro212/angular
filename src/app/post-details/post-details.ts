import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, Commment, PostService } from '../services/post-service';
@Component({
  selector: 'app-post-details',
  imports: [],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails {
  private route = inject(ActivatedRoute)
  private postService = inject(PostService) 

  protected postId = signal('')
  private posts = signal<Post[]>([])
  private comments = signal<Commment[]>([])
  protected post = computed(()=> this.posts().find(post => post.id == Number(this.postId())))
  protected filteredComments = computed(()=> this.comments().filter(comment => comment.postId == Number(this.postId())))
  constructor(){
    this.postService.getPost().subscribe({
      next: data => this.posts.set(data),
      error: err=> console.log(err),
    })
    this.postService.getComment().subscribe({
      next: data => this.comments.set(data),
      error: err => console.log(err)
    })
    this.route.params.subscribe((params)=>{
      this.postId.set(params['id'])
    })
  }

}
