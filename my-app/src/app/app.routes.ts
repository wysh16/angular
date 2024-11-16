import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { TdeeComponent } from './tdee/tdee.component';
import { KqTdeeComponent } from './kq-tdee/kq-tdee.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';

export const routes: Routes = [
    // {path: '', redirectTo: '', pathMatch:'full'},
    { path: 'products', component: ProductComponent },

    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
    { path: 'tdee', component: TdeeComponent },
    { path: 'result', component: KqTdeeComponent },
    { path: 'meal-planner', component: MealPlannerComponent }


];
    