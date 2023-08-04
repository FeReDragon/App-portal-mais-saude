export interface Symptom {
  userId: number;
  symptom: string;
  intensity: number | null;
  frequency: number | null;
  duration: string;
  notes: string;
  timestamp: Date;
}


export interface VitalSigns {
    userId: number;
    bloodPressure: number;
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
    notes: string; // new field
    timestamp: Date;
}

  
export interface SleepTrackerEntry {
  userId: number;
  hoursSlept: number;
  sleepQuality: string;
  sleepEvents: string;
  timestamp: Date;
}

  