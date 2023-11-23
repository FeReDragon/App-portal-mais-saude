export interface Symptom {
  userId: number;
  symptomName: string;
  intensity: number | null;
  frequency: string;
  duration: string;
  notes: string;
  timestamp: Date;
}

export interface VitalSigns {
  userId: number;
  bloodPressure: string;
  heartRate: number;
  bodyTemperature: number;
  bloodGlucose: number;
  timestamp: Date;
}

export interface Exercise {
  userId: number;
  exerciseType: string;
  duration: string;
  intensity: number;
  caloriesBurned: number;
  timestamp: Date;
}

export interface Medication {
  userId: number;
  name: string;
  dose: number;
  frequency: string;
  timestamp: Date;
}

export interface FoodDiaryEntry {
  userId: number;
  food: string;
  calories: number;
  notes: string;
  timestamp: Date;
}


export enum SleepQuality {
  VeryPoor = 0,
  Poor = 1,
  Average = 2,
  Good = 3,
  Excellent = 4
  
}


export interface SleepTrackerEntry {
  userId: number;
  hoursSlept: number;
  sleepQuality: SleepQuality;
  sleepEvents: string;
  timestamp: Date;
}

export interface Dose {
  doseName: string;
  checked: boolean;
  date: string;
}

export interface Vaccination {
  userId: number;
  selectedGroup: string;
  selectedVaccine: string;
  selectedDoses: string[];
  selectedDate: string;  
  timestamp: Date;
}




  