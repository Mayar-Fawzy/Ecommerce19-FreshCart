export interface CallToAction {
  label: string;
  link: string;
}

export interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: CallToAction;
  /** Background colour sampled from the image so the slide never flashes white while loading. */
  tone: string;
}

export interface PromoTile {
  image: string;
  eyebrow: string;
  title: string;
  cta: CallToAction;
}

export interface FeatureHighlight {
  icon: string;
  title: string;
  description: string;
}
