import { useEffect, useState } from 'react';
import { PROFILE_DEFAULTS } from '../constants';
import { IProfile } from '../interfaces';
import Services from '../services';

let profileRequest: Promise<IProfile> | null = null;
let loadedProfile: IProfile | null = null;

const requestProfile = async (): Promise<IProfile> => {
  try {
    const { data } = await Services.getProfile();
    const profile = { ...PROFILE_DEFAULTS, ...data.results };
    loadedProfile = profile;
    return profile;
  } catch {
    profileRequest = null;
    return PROFILE_DEFAULTS;
  }
};

export const loadProfile = (): Promise<IProfile> => {
  profileRequest = profileRequest ?? requestProfile();
  return profileRequest;
};

export const setCachedProfile = (profile: IProfile | null) => {
  loadedProfile = profile;
  profileRequest = profile ? Promise.resolve(profile) : null;
};

export const useProfile = (): IProfile => {
  const [profile, setProfile] = useState<IProfile>(
    () => loadedProfile ?? PROFILE_DEFAULTS,
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
