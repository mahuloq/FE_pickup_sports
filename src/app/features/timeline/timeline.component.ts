import { Component, OnInit } from '@angular/core';
import { Post } from '../../shared/models/post';
import { PostComponent } from '../../shared/components/posts/post/post.component';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getTimelinePosts().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
      },
      error: (error: any) => {
        console.error('Error fetching timeline posts', error);
      },
    });
  }
}
