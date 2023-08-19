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
    const newsId = Number(this.route.snapshot.params['id']); // Converta para Number

    // Chamada para obter a notícia pelo ID
    this.newsService.getNewsById(newsId).subscribe((news: News) => {
      console.log("Notícia recebida:", news); // Adicione esta linha
      this.newsItem = news;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  
    // Chamada para obter os comentários relacionados à notícia
    this.newsService.getUserCommentsForNews(newsId).subscribe((comments: UserComment[]) => {
      console.log("Comentários recebidos:", comments); // Adicione esta linha
      this.comments = comments;
    });
  }
}



