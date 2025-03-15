import { Component, computed, ElementRef, HostListener, inject,  Signal} from '@angular/core';
import { Router} from '@angular/router';
import { RoutingModule } from '../../../core/Shared/Module/routing/routing.module';
import { CartService } from '../../../core/Services/cart.service';
import { WishlistService } from '../../../core/Services/wishlist.service';
import { AuthService } from '../../../core/Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [RoutingModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  profileImage: string = '';
  
  isopen:boolean=false;
  isToken:boolean=true;
  Show: boolean = false; 
  isMenuOpen = false; // الحالة الافتراضية للقائمة

  toggleMenue(){
    this.isopen=!this.isopen;
  }
  toggleShow() {
    this.Show = !this.Show;
    this.isMenuOpen = false;
  }
 
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.Show=false;
     // تبديل الحالة عند النقر
  }
  // لو داس برا الايليمين ف اي مكان ف الصفحه يقفلها
  constructor(private eRef: ElementRef) {}
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
    this.isMenuOpen = false;
    this.Show=false;
        // إغلاق القائمة الرئيسية
      
    }
  }
  private readonly _CartService = inject(CartService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);
  protected readonly _AuthService = inject(AuthService);
  private readonly _WishlistService = inject(WishlistService);
  
  countt: Signal<number> = computed(() => this._CartService.countNumber());
   
  counttWish: Signal<number> = computed(() => this._WishlistService.countNumberWish());
  islogin=this._AuthService.getuserlogged()
 
  userEmail: string = '';
  ngOnInit(): void {
    this._AuthService.profileImage$.subscribe((image) => {
      this.profileImage = image;
    });
    
  if(!localStorage.getItem('userToken')){
    this.isToken=false 
   
  }
 
     this._CartService.GetProductsCart().subscribe({
      next: (res) => {
        console.log('cart items', res);
        this._CartService.countNumber.set(res.numOfCartItems);


      },
    });
    this._WishlistService.GetProductswishlist().subscribe({
      next: (res) => {
        console.log('wishlist items', res);
        this._WishlistService.countNumberWish.set(res.count);
      },
    });
  
   
    this.userEmail = localStorage.getItem('EmailUser')!;
   
     console.log("UserData",this._AuthService.userData)
  }
 
  logout(){  
   
    this._AuthService.logout();

    this._Router.navigate(['/auth/login']);
    localStorage.removeItem('userToken')
    this.isToken=true
  }
}
