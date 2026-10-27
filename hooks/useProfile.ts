import { useEffect, useState } from 'react';
import { PROFILE_DEFAULTS } from '../constants';
import { createCachedLoader } from '../helpers/createCachedLoader';
import { IProfile } from '../interfaces';
import Services from '../services';

const profileLoader = createCachedLoader<IProfile>(async () => {
  const { data } = await Services.getProfile();
  return { ...PROFILE_DEFAULTS, ...data.results };
}, PROFILE_DEFAULTS);

export const loadProfile = profileLoader.load;

export const setCachedProfile = profileLoader.setCached;

export const useProfile = (): IProfile => {
  const [profile, setProfile] = useState<IProfile>(
    () => profileLoader.getCached() ?? PROFILE_DEFAULTS,
  );

  useEffect(() => {
    let isMounted = true;

    loadProfile().then((loaded) => {
      if (isMounted) {
        setProfile(loaded);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return profile;
};
