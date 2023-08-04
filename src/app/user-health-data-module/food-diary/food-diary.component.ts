import { Component, OnInit } from '@angular/core';
import { UserHealthDataService } from '../../services/user-health-data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FoodDiaryEntry } from '../../interfaces/IHealt';

@Component({
  selector: 'app-food-diary',
  templateUrl: './food-diary.component.html',
  styleUrls: ['./food-diary.component.scss']
})
export class FoodDiaryComponent implements OnInit {
  public food: string = '';
  public calories?: number;  // Alterado aqui para ser opcional
  public notes: string = '';
  public foodDiaryEntries: FoodDiaryEntry[] = [];

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getFoodDiaryEntriesForUser(currentUser.id).subscribe((entries: FoodDiaryEntry[]) => {
        this.foodDiaryEntries = entries;
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  registerFoodDiaryEntry() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      const newEntry: FoodDiaryEntry = {
        userId: currentUser.id,
        food: this.food,
        calories: this.calories || 0,  // Alterado aqui para usar 0 se calories for undefined
        notes: this.notes,
        timestamp: new Date()
      };
      this.userHealthDataService.registerFoodDiaryEntry(newEntry).subscribe(() => {
        this.foodDiaryEntries.push(newEntry);
        this.food = '';
        this.calories = undefined;  // Alterado aqui para limpar o campo
        this.notes = '';
      }, (error: any) => {
        console.log(error);
      });
    }
  }
}

