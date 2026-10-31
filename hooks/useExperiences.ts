import { useEffect, useState } from 'react';
import { createCachedLoader } from '../helpers/createCachedLoader';
import { IExperience } from '../interfaces';
import Services from '../services';

const experiencesLoader = createCachedLoader<IExperience[]>(async () => {
  const { data } = await Services.getExperiences();
  return data.results;
}, []);

export const loadExperiences = experiencesLoader.load;

export const setCachedExperiences = experiencesLoader.setCached;

export const useExperiences = (): IExperience[] => {
  const [experiences, setExperiences] = useState<IExperience[]>(
    () => experiencesLoader.getCached() ?? [],
  );

  useEffect(() => {
    let isMounted = true;

    loadExperiences().then((loaded) => {
      if (isMounted) {
        setExperiences(loaded);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return experiences;
};
