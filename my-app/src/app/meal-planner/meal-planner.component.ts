// import { Component, OnInit } from '@angular/core';
// import { MealService } from '../services/thucdon.service';
// import { TdeeService } from '../services/tdee.service';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-meal-planner',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './meal-planner.component.html',
//   styleUrl: './meal-planner.component.css'
// })
// export class MealPlannerComponent implements OnInit {
//   dailyCalories: number = 0; // Lưu calo mục tiêu
//   excludedIngredients: string[] = [];
//   days: number = 1;
//   mealPlans: any[] = [];
//   goal: string = '';
//   meals: any[] = [];

//   constructor(
//     private mealService: MealService,
//     private tdeeService: TdeeService
//   ) {}

//   ngOnInit(): void {
//     const result = this.tdeeService.getResult();
//     if (result) {
//       this.goal = result.goal;
//       this.excludedIngredients = result.excludedIngredients || []; // Lấy nguyên liệu không mong muốn
//     }
//   }
  

//   generateMealPlan() {
//     const mealPlanRequest = {
//       goal: this.goal,
//       excludedIngredients: this.excludedIngredients,
//       days: this.days,
//     };
  
//     this.mealService.createMealPlan(mealPlanRequest).subscribe(
//       response => {
//         this.mealPlans = response.mealPlans; // Cập nhật thực đơn từ backend
//       },
//       error => {
//         console.error('Error fetching meal plans:', error);
//       }
//     );
//   }
  
// }


import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/thucdon.service';
import { TdeeService } from '../services/tdee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meal-planner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-planner.component.html',
  styleUrl: './meal-planner.component.css'
})

export class MealPlannerComponent implements OnInit {
  mealPlan: any[] = []; // Lưu thực đơn lấy từ API
  days: number = 7; // Số ngày cho thực đơn
  goal: string = 'Tăng cân'; // Mục tiêu (Tăng cân, Giảm cân, Duy trì)
  excludedIngredients: string[] = []; // Nguyên liệu loại trừ
  loading: boolean = false; // Trạng thái chờ

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMealPlan(); // Lấy thực đơn khi khởi tạo
  }

  getMealPlan(): void {
    this.loading = true; // Hiển thị trạng thái chờ
    const requestBody = {
      goal: this.goal,
      excludedIngredients: this.excludedIngredients,
      days: this.days,
    };

    this.http.post<any>('/meal-plan', requestBody).subscribe(
      (response) => {
        this.mealPlan = response.mealPlan;
        this.loading = false; // Tắt trạng thái chờ
      },
      (error) => {
        console.error('Error fetching meal plan:', error);
        this.loading = false; // Tắt trạng thái chờ
      }
    );
  }
}
