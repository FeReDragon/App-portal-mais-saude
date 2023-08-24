import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-data-summary',
  templateUrl: './health-data-summary.component.html',
  styleUrls: ['./health-data-summary.component.scss']
})
export class HealthDataSummaryComponent implements OnInit {
  loading = true; // Inicialmente, o spinner será exibido
  cards = [
    { text: 'Sinais Vitais' },
    { text: 'Sintomas' },
    { text: 'Medicamntos' },
    { text: 'Diário Alimentar' },
    { text: 'Exercicios' },
    { text: 'Acompanhamento do Sono' },
    { text: 'Vacinas' },
    { text: 'Relatorio Para Impressão' }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false; // Definindo loading como falso após 300ms
    }, 300);
  }
}
