import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TdeeService {
  private result: {
    goal: string; BMR: number; TDEE: number; dailyCalories: number 
} | null = null;

  setResult(BMR: number, TDEE: number, dailyCalories: number, goal: string) {
    this.result = { BMR, TDEE, dailyCalories, goal };
  }

  getResult() {
    return this.result;
  }
}