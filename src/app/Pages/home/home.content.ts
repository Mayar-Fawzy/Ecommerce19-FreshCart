import { FeatureHighlight, HeroSlide, PromoTile } from '../../core/interfaces/home-content';

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: 'Imges/slider-image-1.jpeg',
    tone: '#f1efe9',
    eyebrow: 'Farm fresh, every day',
    title: 'Fresh groceries, delivered to your door',
    description: 'Hand-picked fruits and vegetables from trusted farms, at prices you will love.',
    cta: { label: 'Shop now', link: '/Product' },
  },
  {
    image: 'Imges/slider-image-2.jpeg',
    tone: '#d8ecef',
    eyebrow: 'Snacks & sweets',
    title: 'Treat yourself to something sweet',
    description: 'Wafers, cookies and chocolates from the brands you already love.',
    cta: { label: 'Explore brands', link: '/Brands' },
  },
  {
    image: 'Imges/slider-image-3.jpeg',
    tone: '#f5e7cf',
    eyebrow: 'Bakery picks',
    title: 'Rich, chocolatey and baked to perfection',
    description: 'Freshly stocked treats for breakfast, coffee breaks and everything in between.',
    cta: { label: 'Browse categories', link: '/Categories' },
  },
];

export const HERO_PROMOS: PromoTile[] = [
  {
    image: 'Imges/grocery-banner.png',
    eyebrow: '100% organic',
    title: 'Fresh vegetables',
    cta: { label: 'Shop now', link: '/Categories' },
  },
  {
    image: 'Imges/grocery-banner-2.jpeg',
    eyebrow: 'Baked daily',
    title: 'Artisan bread',
    cta: { label: 'Shop now', link: '/Categories' },
  },
];

export const FEATURE_HIGHLIGHTS: FeatureHighlight[] = [
  { icon: 'fa-solid fa-truck-fast', title: 'Fast delivery', description: 'Same-day on most orders' },
  { icon: 'fa-solid fa-leaf', title: 'Always fresh', description: 'Quality checked daily' },
  { icon: 'fa-solid fa-shield-halved', title: 'Secure payment', description: 'Cash or card, protected' },
  { icon: 'fa-solid fa-rotate-left', title: 'Easy returns', description: 'Hassle-free refunds' },
];
