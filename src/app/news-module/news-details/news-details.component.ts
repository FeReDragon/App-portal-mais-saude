import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News, UserComment } from '../../interfaces/INews';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailComponent implements OnInit {
  newsId: number | null = null;  // Inicializado com nully
  newsItem: News = {
    titulo: '', url: '', conteudo: '',
    id: 0
  };
  comments: UserComment[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.newsId = Number(this.route.snapshot.params['id']);  // Atualizado
    
    // Chamada para obter a notícia pelo ID
    this.newsService.getNewsById(this.newsId).subscribe(
      (news: News) => {
        console.log("Notícia recebida:", news);
        this.newsItem = news;
        this.loading = false; // Defina como false quando a notícia é carregada
      },
      (error) => {
        console.error("Erro ao receber a notícia:", error);
        this.loading = false; // Defina como false mesmo se a requisição falhar
      }
    );
  
    // Similarmente para comentários
    this.newsService.getUserCommentsForNews(this.newsId).subscribe(
      (comments: UserComment[]) => {
        console.log("Comentários recebidos:", comments);
        this.comments = comments;
      },
      (error) => {
        console.error("Erro ao receber os comentários:", error);
      }
    );
  }
}  




