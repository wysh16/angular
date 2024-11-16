// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class TdeeService {
//   private BMR: number = 0;
//   private TDEE: number = 0;
//   private dailyCalories: number = 0;
//   private goal: string = '';

//   setResult(BMR: number, TDEE: number, dailyCalories: number, goal: string) {
//     this.BMR = BMR;
//     this.TDEE = TDEE;
//     this.dailyCalories = dailyCalories;
//     this.goal = goal;
//   }

//   getResult() {
//     return {
//       BMR: this.BMR,
//       TDEE: this.TDEE,
//       dailyCalories: this.dailyCalories,
//       goal: this.goal,
//     };
//   }
// }


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TdeeService {
  private _BMR: number = 0;
  private _TDEE: number = 0;
  private _dailyCalories: number = 0;
  private _goal: string = '';

  // Setter method để thiết lập các giá trị
  set BMR(value: number) {
    this._BMR = value;
  }

  set TDEE(value: number) {
    this._TDEE = value;
  }

  set dailyCalories(value: number) {
    this._dailyCalories = value;
  }

  set goal(value: string) {
    this._goal = value;
  }

  // Getter method để lấy các giá trị
  get BMR(): number {
    return this._BMR;
  }

  get TDEE(): number {
    return this._TDEE;
  }

  get dailyCalories(): number {
    return this._dailyCalories;
  }

  get goal(): string {
    return this._goal;
  }
}
