import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { AuthenticationService } from '../../services/authentication.service';
import { News } from '../../interfaces/INews';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  newsList: News[] = [];
  showJumbotron = true;

  constructor(
    private newsService: NewsService, 
    private router: Router, 
    public authService: AuthenticationService  // AuthService é público para ser acessível no template
  ) { }

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe((news: News[]) => {
      this.newsList = news;
    });
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://www.damana.com/wp-content/uploads/2021/05/Welcoming-digital-shift-in-healthcare-insurance-scaled.jpg';
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/news', id]);
  }

  closeJumbotron(): void {
    this.showJumbotron = false;
  }
}






