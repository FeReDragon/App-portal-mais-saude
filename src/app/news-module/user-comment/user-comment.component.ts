import { Component, Input } from '@angular/core';
import { UserComment } from '../../interfaces/INews';

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss']
})
export class UserCommentComponent {
  @Input() comments: UserComment[] = [];
}





