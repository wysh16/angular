import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductComponent} from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { TdeeComponent } from './tdee/tdee.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,  FooterComponent,  CommonModule,  NavbarComponent, PageNotFoundComponent,  ProductComponent, ProductDetailComponent, RouterModule, CartComponent, TdeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';

  messageToChild="Hello from Parent Comp!"

  dataFromChild: any
}


