import Hero from './hero';
import HeroActions from './hero-actions';
import HeroDesc from './hero-desc';
import HeroTag from './hero-tag';
import HeroTitle from './hero-title';

export type HeroType = typeof Hero & {
  Title: typeof HeroTitle;
  Desc: typeof HeroDesc;
  Actions: typeof HeroActions;
  Tag: typeof HeroTag;
};
(Hero as HeroType).Title = HeroTitle;
(Hero as HeroType).Desc = HeroDesc;
(Hero as HeroType).Actions = HeroActions;
(Hero as HeroType).Tag = HeroTag;

export type { HeroProps } from './share';

export default Hero as HeroType;
