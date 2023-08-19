import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-data-summary',
  templateUrl: './health-data-summary.component.html',
  styleUrls: ['./health-data-summary.component.scss']
})
export class HealthDataSummaryComponent implements OnInit {
  loading = true; // Inicialmente, o spinner será exibido

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false; // Definindo loading como falso após 300ms
    }, 300);
  }
}
