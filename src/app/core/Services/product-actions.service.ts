import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { CartService } from './cart.service';
import { WishlistService } from './wishlist.service';

const TOAST_TITLE = 'FreshCart';

/**
 * Single place for the "add to cart / add to wishlist" flow used by every product card:
 * auth check, API call, navbar counter sync and user feedback.
 * Each method emits once on success and completes; errors are handled here.
 */
@Injectable({ providedIn: 'root' })
export class ProductActionsService {
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  addToCart(productId: string): Observable<void> {
    if (!this.ensureAuthenticated('Please login to add products to your cart')) {
      return EMPTY;
    }

    return this.cartService.addProductToCart(productId).pipe(
      tap((res) => {
        this.cartService.countNumber.set(res.numOfCartItems);
        this.toastr.success('Product added to cart', TOAST_TITLE);
      }),
      map(() => undefined),
      catchError((err) => this.handleError(err))
    );
  }

  addToWishlist(productId: string): Observable<void> {
    if (!this.ensureAuthenticated('Please login to add products to your wishlist')) {
      return EMPTY;
    }

    return this.wishlistService.Addproducttowishlist(productId).pipe(
      tap((res) => {
        // POST /wishlist returns the list of product ids, not a count.
        this.wishlistService.countNumberWish.set(res.data?.length ?? 0);
        this.toastr.success('Product added to wishlist', TOAST_TITLE);
      }),
      map(() => undefined),
      catchError((err) => this.handleError(err))
    );
  }

  private ensureAuthenticated(message: string): boolean {
    const hasToken =
      isPlatformBrowser(this.platformId) && !!localStorage.getItem('userToken');

    if (!hasToken) {
      this.toastr.error(message, TOAST_TITLE);
    }
    return hasToken;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    this.toastr.error(err.error?.message ?? 'Something went wrong, please try again', TOAST_TITLE);

    if (err.status === 401) {
      this.router.navigate(['/auth/login']);
    }
    return EMPTY;
  }
}
