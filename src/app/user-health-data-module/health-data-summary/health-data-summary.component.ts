import { Component, OnInit } from '@angular/core';

interface Card {
  text: string;
  icon: string;
  desc: string;
}

@Component({
  selector: 'app-health-data-summary',
  templateUrl: './health-data-summary.component.html',
  styleUrls: ['./health-data-summary.component.scss']
})
export class HealthDataSummaryComponent implements OnInit {
  loading = true;
  cards: Card[] = [

      { "text": "Sinais Vitais", "icon": "fa-heart", "desc": "Painel intuitivo para monitoramento de pressão, frequência cardíaca e mais." },
      { "text": "Sintomas", "icon": "fa-thermometer-half", "desc": "Registre e analise sintomas para um cuidado preventivo e informado." },
      { "text": "Medicamentos", "icon": "fa-pills", "desc": "Acompanhamento simplificado de medicações para uma gestão de saúde eficaz." },
      { "text": "Diário Alimentar", "icon": "fa-utensils", "desc": "Controle sua dieta e entenda o impacto nutricional no seu bem-estar." },
      { "text": "Exercícios", "icon": "fa-running", "desc": "Monitore atividades e progresso, incentivando um estilo de vida ativo." },
      { "text": "Acompanhamento do Sono", "icon": "fa-bed", "desc": "Avalie padrões de sono para melhorar seu descanso e saúde." },
      { "text": "Vacinas", "icon": "fa-syringe", "desc": "Carteira digital de imunização para manter seu histórico de vacinas acessível." },
      { "text": "Relatório Para Impressão", "icon": "fa-print", "desc": "Relatórios de saúde organizados e prontos para impressão a qualquer momento." }
  
  
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

