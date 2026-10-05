import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface FooterLink {
  label: string;
  link: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly toastr = inject(ToastrService);

  readonly currentYear = new Date().getFullYear();

  readonly linkGroups: FooterLinkGroup[] = [
    {
      title: 'Shop',
      links: [
        { label: 'Home', link: '/home' },
        { label: 'All products', link: '/Product' },
        { label: 'Categories', link: '/Categories' },
        { label: 'Brands', link: '/Brands' },
      ],
    },
    {
      title: 'My account',
      links: [
        { label: 'Shopping cart', link: '/Cart' },
        { label: 'Wishlist', link: '/Wishlist' },
        { label: 'Profile', link: '/Personal' },
        { label: 'Sign in', link: '/auth/login' },
      ],
    },
  ];

  readonly contacts: ContactItem[] = [
    { icon: 'fa-solid fa-location-dot', label: 'Address', value: 'Alexandria, Egypt' },
    { icon: 'fa-solid fa-phone', label: 'Phone', value: '01278746444', href: 'tel:+201278746444' },
    { icon: 'fa-regular fa-envelope', label: 'Email', value: 'dev@mayora.com', href: 'mailto:dev@mayora.com' },
  ];

  // Replace with the store's real profile URLs.
  readonly socials: SocialLink[] = [
    { icon: 'fa-brands fa-facebook-f', label: 'Facebook', href: 'https://facebook.com' },
    { icon: 'fa-brands fa-instagram', label: 'Instagram', href: 'https://instagram.com' },
    { icon: 'fa-brands fa-x-twitter', label: 'X (Twitter)', href: 'https://x.com' },
    { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  readonly paymentMethods = [
    { icon: 'fa-brands fa-cc-visa', label: 'Visa' },
    { icon: 'fa-brands fa-cc-mastercard', label: 'Mastercard' },
    { icon: 'fa-brands fa-cc-paypal', label: 'PayPal' },
    { icon: 'fa-brands fa-cc-amex', label: 'American Express' },
  ];

  readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  readonly submitted = signal(false);

  subscribe(): void {
    this.submitted.set(true);
    if (this.email.invalid) return;

    // No newsletter endpoint exists yet — confirm locally.
    this.toastr.success("You're subscribed! Watch your inbox for fresh deals.", 'FreshCart');
    this.email.reset();
    this.submitted.set(false);
  }
}
