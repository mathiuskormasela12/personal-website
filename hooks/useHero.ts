import { useEffect, useState } from 'react';
import { HERO_DEFAULTS } from '../constants';
import { createCachedLoader } from '../helpers/createCachedLoader';
import { IHero } from '../interfaces';
import Services from '../services';

const heroLoader = createCachedLoader<IHero>(async () => {
  const { data } = await Services.getHero();
  return { ...HERO_DEFAULTS, ...data.results };
}, HERO_DEFAULTS);

export const loadHero = heroLoader.load;

export const setCachedHero = heroLoader.setCached;

export const useHero = (): IHero | null => {
  const [hero, setHero] = useState<IHero | null>(() => heroLoader.getCached());

  useEffect(() => {
    let isMounted = true;

    loadHero().then((loaded) => {
      if (isMounted) {
        setHero(loaded);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return hero;
};
