// pdf.service.ts
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserHealthDataService } from './user-health-data.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor(private healthDataService: UserHealthDataService) { }

  public generatePdfForUser(userId: number, duration: number, title: string): void {
    forkJoin({
      vitalSigns: this.healthDataService.getVitalSignsForUser(),
      symptoms: this.healthDataService.getSymptomsForUser(),
      medications: this.healthDataService.getMedicationsForUser(),
      exercises: this.healthDataService.getExercisesForUser(userId),
      foodDiaryEntries: this.healthDataService.getFoodDiaryEntriesForUser(),
      sleepTrackerEntries: this.healthDataService.getSleepTrackerEntriesForUser(),
      vaccinationSchedules: this.healthDataService.getVaccinationSchedulesForUser(userId)
    }).pipe(
      map(data => {
        // Aqui você processaria todos os dados e os formataria para a saída do PDF
        // Esta é uma função hipotética que você precisaria implementar
        return this.formatDataForPdf(data, duration);
      })
    ).subscribe(formattedData => {
      // Renderiza os dados formatados para o PDF
      this.renderPdf(formattedData, title);
    });
  }

  private formatDataForPdf(data: any, duration: number): string {
    // Implemente a lógica para transformar os dados recebidos em um formato adequado para o PDF
    // Você pode criar um template HTML aqui e preencher com os dados recebidos
    let htmlContent = `<h1>Relatório de Saúde</h1>`;
    // Adicione cada seção do relatório
    // ...
    return htmlContent;
  }

  private async renderPdf(htmlContent: string, title: string): Promise<void> {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    document.body.appendChild(element);

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();

      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      doc.save(`${title}.pdf`);
    } catch (error) {
      console.error('Erro ao renderizar o PDF:', error);
    } finally {
      document.body.removeChild(element);
    }
  }
   // Dentro do PdfService

public async generatePdfFromElement(content: HTMLElement, title: string): Promise<void> {
    console.log(content.innerHTML);
    try {
      const canvas = await html2canvas(content).catch(error => {
        throw new Error(`Erro no html2canvas: ${error.message}`);
      });
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
  
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
      doc.save(`${title}.pdf`);
      console.log('PDF salvo com sucesso');
    } catch (error) {
      console.error('Erro ao renderizar o PDF:', error);
    }
  }
}