import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserComment } from '../../interfaces/INews';
import { NewsService } from '../../services/news.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss']
})
export class UserCommentComponent {
  @Input() currentNewsId: number | null = null;  // Inicializado com null
  @Input() comments: UserComment[] = [];
  @Output() commentAdded = new EventEmitter<UserComment>();
  newComment = '';

  constructor(private newsService: NewsService, private authService: AuthenticationService) {}

  addComment() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id && this.currentNewsId !== null) {
      // Remova o campo 'id' para que o json-server gere um automaticamente
      const newComment: Omit<UserComment, 'id'> = {
        userId: currentUser.id,
        newsId: this.currentNewsId,
        comment: this.newComment
      };
  
      this.newsService.addComment(newComment as unknown as UserComment).subscribe(
        (addedComment) => {
          this.comments.push(addedComment);
          this.commentAdded.emit(addedComment);
          this.newComment = '';
        },
        (error) => {
          console.error('Ocorreu um erro ao adicionar o comentário:', error);
        }
      );
    }
  }
  

}




