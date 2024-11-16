import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TdeeService } from '../services/tdee.service';

@Component({
  
  selector: 'app-tdee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tdee.component.html',
  styleUrls: ['./tdee.component.css']
})
export class TdeeComponent {
  age: number | null = null;
  gender: string = '';
  height: number | null = null;
  weight: number | null = null;
  activityLevel: number | null = null;
  goal: string = '';

  constructor(private router: Router, private tdeeService: TdeeService) {} // Khai báo Router trong constructor

  calculate() {
    if (this.age && this.height && this.weight && this.activityLevel && this.gender) {
      let BMR: number;
      if (this.gender === 'Nam') {
        BMR = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5;
      } else {
        BMR = 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;
      }

      const TDEE = BMR * this.activityLevel;

      let calorieAdjustment: number;
      if (this.goal === 'Giảm cân') {
        calorieAdjustment = -500;
      } else if (this.goal === 'Tăng cân') {
        calorieAdjustment = 500;
      } else {
        calorieAdjustment = 0;
      }

      const dailyCalories = TDEE + calorieAdjustment;

      // Lưu kết quả vào service
      this.tdeeService.setResult(BMR, TDEE, dailyCalories, this.goal);

      // Điều hướng đến trang kết quả
      this.router.navigate(['/result']);
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  }
}