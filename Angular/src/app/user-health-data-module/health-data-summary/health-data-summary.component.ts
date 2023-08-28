import { Component, OnInit } from '@angular/core';

interface Card {
  text: string;
  icon: string;
}

@Component({
  selector: 'app-health-data-summary',
  templateUrl: './health-data-summary.component.html',
  styleUrls: ['./health-data-summary.component.scss']
})
export class HealthDataSummaryComponent implements OnInit {
  loading = true;
  cards: Card[] = [
    { text: 'Sinais Vitais', icon: 'fa-heart' },
    { text: 'Sintomas', icon: 'fa-thermometer-half' },
    { text: 'Medicamentos', icon: 'fa-pills' },
    { text: 'Diário Alimentar', icon: 'fa-utensils' },
    { text: 'Exercícios', icon: 'fa-running' },
    { text: 'Acompanhamento do Sono', icon: 'fa-bed' },
    { text: 'Vacinas', icon: 'fa-syringe' },
    { text: 'Relatório Para Impressão', icon: 'fa-print' }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }

  getCardIconClass(card: Card): string {
    return 'fa ' + card.icon;
  }
}

