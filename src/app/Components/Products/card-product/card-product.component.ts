import { Component, inject, Input } from '@angular/core';
import {  ICardProducts } from '../../../core/interfaces/card-products';
import { CurrencyPipe } from '@angular/common';
import { RoutingModule } from '../../../core/Shared/Module/routing/routing.module';
import { CutPipe } from '../../../core/Pipes/cut.pipe';
import { WishlistService } from '../../../core/Services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../core/Services/cart.service';
import { Icart } from '../../../core/interfaces/icart';
@Component({
  selector: 'app-card-product',
  imports: [CurrencyPipe, RoutingModule,CutPipe],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent{  
  @Input() CardProducts: ICardProducts []=[];
   WishLisst:ICardProducts[]=[];
  @Input() WishLisstCard:ICardProducts[]=[];
  msgError!: string;
   private readonly _ActivatedRoute = inject(ActivatedRoute);
    private readonly _Router = inject(Router);
   private readonly _CartService = inject(CartService);
   private readonly _ToastrService = inject(ToastrService);
 
  private readonly _WishlistService=inject(WishlistService);

  constructor(){}
  

 
  addToWishList(productId: string) {
    if(!localStorage.getItem('userToken')){
      this.msgError='Please login to add product to wishlist';
      this._ToastrService.error(this.msgError,'FreshCart')
      return;
    }
    else{
      this._WishlistService.Addproducttowishlist(productId).subscribe({
      next: (res) => {
           this.WishLisst=res.data;
           this._ToastrService.success('Product Added to Wishlist', 'Success');
           
           this._WishlistService.countNumberWish.set(res.count);
           console.log('WishListSigNall' ,      this._WishlistService.countNumberWish.set(res.data.count));
          console.log('WishList' ,this.WishLisst);
        
        

      },

      error: (err) => {
        console.log(err);
        this.msgError = err.error.message;
        this._ToastrService.error(this.msgError, 'FreshCart', { timeOut: 2000 });
      
      },
    });
    }
    
    
  }
  addToCart(productId: string) {
    
    if(!localStorage.getItem('userToken')){
   this.msgError='Please login to add product to Cart';
      this._ToastrService.error(this.msgError,'FreshCart')
      return;
    }
    else{
       this._CartService.addProductToCart(productId).subscribe({
      next: (data) => {
        this._CartService.countNumber.set(data.numOfCartItems);
        this._ToastrService.success('Product added to cart', 'FreshCart', {timeOut: 3000});
        
      },

      error: (err) => {
        console.log(err);
        this.msgError = err.error.message;
        this._ToastrService.error(this.msgError, 'FreshCart', {timeOut: 2000});
        this._Router.navigate(['/auth/login']);
      },
    });
    }
   
     
}  }

 
