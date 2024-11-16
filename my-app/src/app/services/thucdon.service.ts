import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'http://localhost:3000/meal'; // Địa chỉ API của bạn

  constructor(private http: HttpClient) {}

  // Hàm để lấy danh sách mealIngredients
  getMealIngredients(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/ingredients`);
  }
 
  createMealPlan(mealPlanRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/meal-plan`, mealPlanRequest);
  }
}