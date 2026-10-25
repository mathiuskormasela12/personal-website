import type { GetServerSideProps } from 'next';
import { HERO_DEFAULTS } from '../constants';
import { IHeroPageProps } from '../interfaces';
import Services from '../services';

export const getHeroServerSideProps: GetServerSideProps<
  IHeroPageProps
> = async () => {
  try {
    const { data } = await Services.getHero();
    return { props: { hero: data.results } };
  } catch {
    return { props: { hero: HERO_DEFAULTS } };
  }
};
