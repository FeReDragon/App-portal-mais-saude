export interface VitalSigns {
    bloodPressure: number;
    heartRate: number;
    bodyTemperature: number;
    bloodGlucose: number;
  }
  
  export interface Symptom {
    name: string;
    severity: number; // 1-10
    description: string;
  }
  
  export interface Medication {
    name: string;
    dose: number;
    frequency: string; // "daily", "weekly", etc.
  }
  
  export interface FoodDiaryEntry {
    date: string; // ISO date string
    food: string;
    calories: number;
  }
  
  export interface SleepLog {
    date: string; // ISO date string
    duration: number; // in hours
  }
  