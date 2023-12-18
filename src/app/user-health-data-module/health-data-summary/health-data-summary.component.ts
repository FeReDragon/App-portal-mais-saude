import { Component, OnInit } from '@angular/core';

interface Card {
  text: string;
  icon: string;
  desc: string;
  tool: string; 
}

@Component({
  selector: 'app-health-data-summary',
  templateUrl: './health-data-summary.component.html',
  styleUrls: ['./health-data-summary.component.scss']
})
export class HealthDataSummaryComponent implements OnInit {
  loading = true;
  cards: Card[] = [
    { "text": "Sinais Vitais", "icon": "fa-heart", "desc": "Painel intuitivo para monitoramento de pressão, frequência cardíaca e mais.", "tool": "Informações sobre seus Sinais Vitais" },
    { "text": "Sintomas", "icon": "fa-thermometer-half", "desc": "Registre e analise sintomas para um cuidado preventivo e informado.", "tool": "Informações sobre seus Sintomas"},
    { "text": "Medicamentos", "icon": "fa-pills", "desc": "Acompanhamento simplificado de medicações para uma gestão de saúde eficaz.", "tool": "Informações sobre seus Medicamentos" },
    { "text": "Diário Alimentar", "icon": "fa-utensils", "desc": "Controle sua dieta e entenda o impacto nutricional no seu bem-estar.", "tool": "Informações sobre seu Diario Alimentar" },
    { "text": "Exercícios", "icon": "fa-running", "desc": "Monitore atividades e progresso, incentivando um estilo de vida ativo.", "tool": "Informações sobre seus Exercicios" },
    { "text": "Acompanhamento do Sono", "icon": "fa-bed", "desc": "Avalie padrões de sono para melhorar seu descanso e saúde.", "tool": "Informações sobre seu Acompanhamento do Sono" },
    { "text": "Vacinas", "icon": "fa-syringe", "desc": "Carteira digital de imunização para manter seu histórico de vacinas acessível.", "tool": "Informações sobre suas Vacinas" },
    { "text": "Relatório Para Impressão", "icon": "fa-print", "desc": "Relatórios de saúde organizados e prontos para impressão a qualquer momento.", "tool": "Informações sobre seus relatorios para impressão" }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }

  getCardIconClass(card: Card): string {
    return 'fa ' + card.icon;
  }

  getRouterLink(card: Card): string {
    switch (card.text) {
      case "Sinais Vitais":
        return "/vital-signs";
      case "Sintomas":
        return "/symptomMonitoring";
      case "Medicamentos":
        return "/medication-log";
      case "Diário Alimentar":
        return "/food-diary";
      case "Exercícios":
        return "/exercise-log";
      case "Acompanhamento do Sono":
        return "/sleep-tracker";
      case "Vacinas":
        return "/vaccination-record";
      case "Relatório Para Impressão":
        return "/printable-reports";
      default:
        return "/";
    }
  }
}
