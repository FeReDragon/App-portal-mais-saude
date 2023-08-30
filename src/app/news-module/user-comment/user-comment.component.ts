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
    if (currentUser && currentUser.id && this.currentNewsId !== null) { // Adicione a checagem aqui
      const newComment: UserComment = {
        id: this.comments.length + 1,
        userId: currentUser.id,
        newsId: this.currentNewsId,
        comment: this.newComment
      };

    // Utilize o serviço para adicionar o novo comentário
    this.newsService.addComment(newComment).subscribe(
      (addedComment) => {
        this.comments.push(addedComment);  // Atualize o array local de comentários
        this.commentAdded.emit(addedComment);  // Emita o evento para atualizar em outros lugares, se necessário
        this.newComment = '';  // Limpe o campo de entrada
      },
      (error) => {
        console.error('Ocorreu um erro ao adicionar o comentário:', error);
      }
    );
  }
}

}




