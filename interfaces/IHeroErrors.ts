import { IHero } from './IHero';

export type IHeroErrors = Partial<Record<keyof IHero, string>>;
