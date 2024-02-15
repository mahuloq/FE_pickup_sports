import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input({ required: true }) post: Post = new Post({});
}
