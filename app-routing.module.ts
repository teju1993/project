import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'seller-auth', component: SellerAuthComponent
  },
  {
    path: 'seller-home', component: SellerHomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'seller-Add-Product', component: SellerAddProductComponent,
    canActivate: [authGuard]

  },
  {
    path: 'seller-update-product/:id', component: SellerUpdateProductComponent,
    canActivate: [authGuard]

  },
  {
    path: 'search/:query', component: SearchComponent,
  },
  {
    path: 'details/:productId', component: ProductDetailsComponent,
  },
  {
    component: UserAuthComponent,
    path: 'user-auth',
  },
  {
    component: CartPageComponent,
    path: 'cart-page',
  },
  {
    component: CheckoutComponent,
    path: 'checkout',
  },
  {
    component: MyOrderComponent,
    path: 'my-order',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),


  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
