import { Component, OnInit } from '@angular/core';
import { TdeeService } from '../services/tdee.service';
import { MealService } from '../services/thucdon.service';
import { CommonModule, formatCurrency } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kq-tdee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kq-tdee.component.html',
  styleUrl: './kq-tdee.component.css'
})
export class KqTdeeComponent implements OnInit{
    BMR: number | null = null;
    TDEE: number | null = null;
    dailyCalories: number | null = null;
    goal: string='';
    ingredients: string[]=[];
    filteredIngredients: string[] = [];
    searchTerm: string='';
    selectedTags: string[]=[];
    showDropdown: boolean = false;
    days: number = 1; // Mặc định là 1 ngày
  
    constructor(
      private tdeeService: TdeeService,
      private mealService: MealService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      const result = this.tdeeService.getResult();
      if (result) {
        this.BMR = result.BMR;
        this.TDEE = result.TDEE;
        this.dailyCalories = result.dailyCalories;
        this.goal = result.goal;
        
      };
      
      this.loadIngredients();
    }

    // ngOnInit(): void {
    //   // Lấy kết quả từ TdeeService và lưu vào biến
    //   const result = this.tdeeService.getResult();
    //   if (result) {
    //     // Lưu trữ excludedIngredients vào TdeeService
    //     this.tdeeService.setResult(result.BMR, result.TDEE, result.dailyCalories, result.goal, this.selectedTags);
    //   };
    // }


    loadIngredients() {
      this.mealService.getMealIngredients().subscribe(
        (data) => {
          console.log('Ingredients:', data); // Thêm dòng log
          this.ingredients = data;
          this.filteredIngredients = data;
        },
        error => {
          console.error('Error fetching ingredients:', error);
        }
      );
    }
    
    filterIngredients() {
      const term = this.searchTerm.toLowerCase();
      this.filteredIngredients = this.ingredients.filter(ingredient => 
        ingredient.toLowerCase().includes(term)
      );
    }
  
    // selectIngredient(ingredient: string) {
    //   if (!this.selectedTags.includes(ingredient)) {
    //     this.selectedTags.push(ingredient);
    //   }
    //   this.tdeeService.setResult(
    //     this.BMR!,
    //     this.TDEE!,
    //     this.dailyCalories!,
    //     this.goal,
    //     this.selectedTags // Thêm danh sách nguyên liệu không mong muốn
    //   );
    // }
    

    selectIngredient(ingredient: string) {
      if (!this.selectedTags.includes(ingredient)) {
        this.selectedTags.push(ingredient);
      }
      this.searchTerm = '';
      this.showDropdown = false;
      this.filterIngredients();
    }
    

    removeTag(tag: string) {
      this.selectedTags = this.selectedTags.filter((t) => t !== tag); // Xóa tag khỏi mảng
    }
    

    // buildMealPlan() {
    //   this.router.navigate(['/meal-planner']);
    // }

    buildMealPlan() {
      if (!this.dailyCalories) {
        alert('Vui lòng nhập đầy đủ thông tin để tính TDEE.');
        return;
      }
  
      // Gửi yêu cầu lấy thực đơn
      const mealPlanRequest = {
        dailyCalories: this.dailyCalories,
        excludeIngredients: this.selectedTags,
        days: this.days,
      };
  
    //   this.mealService.createMealPlan(mealPlanRequest).subscribe(
    //     (data: any) => {
    //       console.log('Meal Plan:', data);
    //       // Điều hướng đến trang thực đơn hoặc xử lý kết quả
    //       this.router.navigate(['/meal-planner']);
    //     },
    //     (error) => {
    //       console.error('Error creating meal plan:', error);
    //     }
    //   );
    // }



  }
}
  
