import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/Services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-address',
  imports: [ReactiveFormsModule],
  templateUrl: './show-address.component.html',
  styleUrl: './show-address.component.scss'
})
export class ShowAddressComponent {
  @Output() tabChange = new EventEmitter<number>();
 
  goToEditUser(num:number) {
    this.tabChange.emit(num);
  }
  protected readonly _AuthService=inject(AuthService);

  userEmail :string= localStorage.getItem('EmailUser')!;
 
  @ViewChild('InputName') myInput!: ElementRef;
  Doo(){
    this._AuthService.username.set(this.myInput.nativeElement.value);
    console.log("Navigate",this.myInput.nativeElement.value);
     this.goToEditUser(0);
  }
  ngAfterViewInit() {
    this._AuthService.username.set(this.myInput.nativeElement.value);
    console.log("Navigate",this.myInput.nativeElement.value);
  }
  imageUrl: string | null = null; // تخزين رابط الصورة للعرض
 ngOnInit(): void {
  this.loadFromLocalStorage();
 }

 onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        localStorage.setItem('uploadedImage', base64String); // حفظ في localStorage
        this.imageUrl = base64String; // تحديث الصورة للعرض
      };

      reader.readAsDataURL(file);
    }
  }

  loadFromLocalStorage() {
    this.imageUrl = localStorage.getItem('uploadedImage'); // استرجاع الصورة المخزنة
  }
  clearLocalStorage() {
    localStorage.removeItem('uploadedImage'); // حذف الصورة من التخزين
    this.imageUrl = null;
  }
 }
  


  

