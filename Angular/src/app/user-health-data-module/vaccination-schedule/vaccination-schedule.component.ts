import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service'; // Adicione esta importação
import { UserHealthDataService } from '../../services/user-health-data.service';
import { Vaccination, Dose } from '../../interfaces/IHealt';

@Component({
  selector: 'app-vaccination-schedule',
  templateUrl: './vaccination-schedule.component.html',
  styleUrls: ['./vaccination-schedule.component.scss']
})
export class VaccinationScheduleComponent implements OnInit {
  vaccineForm: FormGroup;
  selectedGroup: string = "";
  selectedVaccine: string = "";
  selectedDate: string = "";
  registeredVaccinations: Vaccination[] = [];
  filteredVaccines: any[] = [];
  selectedDoses: Dose[] = [];
  groups: string[] = ["Crianças", "Adolescentes", "Adultos", "Idosos", "Gestantes",];
  vaccinesByGroup: Record<string, any> = {
    'Crianças': [
      { name: 'BCG (Tuberculose)', doses: [{ doseName: 'Dose ao nascer', checked: false, date: '' }] },
      { name: 'Hepatite B', doses: [
        { doseName: 'Dose ao nascer', checked: false, date: '' },
        { doseName: '2 meses', checked: false, date: '' },
        { doseName: '6 meses', checked: false, date: '' }
      ]},
      { name: 'VIP/VOP (Poliomielite)', doses: [
        { doseName: '2 meses (VIP)', checked: false, date: '' },
        { doseName: '4 meses (VIP)', checked: false, date: '' },
        { doseName: '6 meses (VIP)', checked: false, date: '' },
        { doseName: '15 meses (VOP)', checked: false, date: '' },
        { doseName: '4 anos (VOP)', checked: false, date: '' }
      ]},
      { name: 'Pentavalente (DTP, Hib e Hepatite B)', doses: [
        { doseName: '2 meses', checked: false, date: '' },
        { doseName: '4 meses', checked: false, date: '' },
        { doseName: '6 meses', checked: false, date: '' }
      ]},
      { name: 'Pneumocócica 10-valente', doses: [
        { doseName: '2 meses', checked: false, date: '' },
        { doseName: '4 meses', checked: false, date: '' },
        { doseName: '12 meses', checked: false, date: '' }
      ]},
      { name: 'Meningocócica C ou ACWY', doses: [
        { doseName: '3 meses', checked: false, date: '' },
        { doseName: '5 meses', checked: false, date: '' },
        { doseName: '12 meses', checked: false, date: '' },
        { doseName: '11 anos', checked: false, date: '' }
      ]},
      { name: 'Rotavírus', doses: [
        { doseName: '2 meses', checked: false, date: '' },
        { doseName: '4 meses', checked: false, date: '' }
      ]},
      { name: 'Febre Amarela', doses: [
        { doseName: '9 meses', checked: false, date: '' },
        { doseName: '4 anos', checked: false, date: '' }
      ]},
      { name: 'Tríplice Viral (Sarampo, Caxumba e Rubéola)', doses: [
        { doseName: '12 meses', checked: false, date: '' },
        { doseName: '15 meses (Tetra Viral)', checked: false, date: '' }
      ]},
      { name: 'DTPa (Difteria, Tétano e Coqueluche)', doses: [
        { doseName: '15 meses', checked: false, date: '' },
        { doseName: '4 anos', checked: false, date: '' }
      ]},
      { name: 'Hepatite A', doses: [
        { doseName: '15 meses', checked: false, date: '' }
      ]}
    ],
    
     'Adolescentes': [
      { name: 'HPV quadrivalente', doses: [
        { doseName: 'Primeira Dose', checked: false, date: '' },
        { doseName: 'Segunda Dose - 6 meses', checked: false, date: '' }
      ]},
      { name: 'Meningocócica ACWY', doses: [
        { doseName: 'Dose única aos 11 anos', checked: false, date: '' }
      ]},
      { name: 'dTpa (Difteria, Tétano e Coqueluche)', doses: [
        { doseName: 'Dose única aos 11 anos', checked: false, date: '' }
      ]}
    ],
    'Adultos': [
      { name: 'Hepatite B', doses: [
        { doseName: 'Primeira Dose', checked: false, date: '' },
        { doseName: 'Segunda Dose', checked: false, date: '' },
        { doseName: 'Terceira Dose', checked: false, date: '' }
      ]},
      { name: 'dT (Difteria e Tétano)', doses: [
        { doseName: 'Reforço a cada 10 anos', checked: false, date: '' }
      ]},
      { name: 'Tríplice Viral', doses: [
        { doseName: 'Primeira Dose', checked: false, date: '' },
        { doseName: 'Segunda Dose', checked: false, date: '' }
      ]},
      { name: 'Febre Amarela', doses: [
        { doseName: 'Dose única a cada 10 anos', checked: false, date: '' }
      ]}
    ],
    'Idosos': [
      { name: 'Influenza (Gripe)', doses: [
        { doseName: 'Dose anual', checked: false, date: '' }
      ]},
      { name: 'Pneumocócica 23-valente', doses: [
        { doseName: 'Dose única', checked: false, date: '' },
        { doseName: 'Possibilidade de reforço', checked: false, date: '' }
      ]},
      { name: 'dT (Difteria e Tétano)', doses: [
        { doseName: 'Reforço a cada 10 anos', checked: false, date: '' }
      ]}
    ],
    'Gestantes': [
      { name: 'dTpa (Difteria, Tétano e Coqueluche)', doses: [
        { doseName: 'Dose única em cada gestação', checked: false, date: '' }
      ]},
    ]
  };
  constructor(
    private fb: FormBuilder, 
    private healthService: UserHealthDataService,
    private authenticationService: AuthenticationService  // Adicione esta linha
  ) { 
    this.vaccineForm = this.fb.group({
      selectedGroup: [''],
      selectedVaccine: [''],
      // ... outros controles de formulário aqui
    });
  }

  ngOnInit(): void {
    this.getRegisteredVaccinations(); // Adicione esta linha
    this.vaccineForm?.get('selectedGroup')?.valueChanges.subscribe(value => {
      this.selectedGroup = value;
      this.updateVaccines();
    });
    
    this.vaccineForm?.get('selectedVaccine')?.valueChanges.subscribe(value => {
      this.selectedVaccine = value;
      this.updateDoses();
    });
  }

  getRegisteredVaccinations(): void {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.healthService.getVaccinationSchedulesForUser(currentUser.id).subscribe((data: Vaccination[]) => {
        if (data) {
          this.registeredVaccinations = data;
        }
      },
      error => {
        console.error('Error fetching registered vaccinations:', error);
      });
    }
  }
  
  updateVaccines(): void {
    this.filteredVaccines = this.vaccinesByGroup[this.selectedGroup] || [];
    console.log("Filtered Vaccines:", this.filteredVaccines);
  
    // Adicione estas linhas
    if (this.filteredVaccines.length > 0) {
      this.selectedVaccine = this.filteredVaccines[0].name;
      this.updateDoses();
    }
  }
  
  updateDoses(): void {
    console.log("updateDoses called");
    const vaccine = this.filteredVaccines.find(v => v.name === this.selectedVaccine);
    this.selectedDoses = vaccine ? vaccine.doses : [];
    console.log("Selected Doses:", this.selectedDoses);
  }
  
  registerVaccination(): void {
    const selectedDosesChecked: Dose[] = this.selectedDoses.filter(dose => dose.checked);
  
    const vaccination: Vaccination = {
        userId: 0,  // Este valor será atualizado no serviço
        selectedGroup: this.selectedGroup,
        selectedVaccine: this.selectedVaccine,
        selectedDoses: selectedDosesChecked.map(dose => dose.doseName),
        selectedDate: this.selectedDate,  // Adicione esta linha se você atualizar sua interface Vaccination para incluir selectedDate
        timestamp: new Date()
      };
      
  
      this.healthService.registrarCalendarioVacinas(vaccination).subscribe(
        data => {
          this.registeredVaccinations.push(data);
          this.vaccineForm.reset(); // Reseta o formulário
        },
        error => {
          console.error('Error registering vaccination:', error);
        }
      );
    }
  }