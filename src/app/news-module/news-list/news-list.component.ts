import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../interfaces/INews';

// Importe o Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  newsList: News[] = [];

  // Adicione o Router como uma dependência
  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe((news: News[]) => {
      this.newsList = news;
    });
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://www.damana.com/wp-content/uploads/2021/05/Welcoming-digital-shift-in-healthcare-insurance-scaled.jpg'; // Forneça o caminho para sua imagem padrão
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/news', id]);
  }

}







