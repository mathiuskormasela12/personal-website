import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { PROTECTED_PATHS } from '../../constants/PROTECTED_PATHS';
import { isSessionExpired } from '../../helpers/isTokenExpired';
import { IGlobalStates } from '../../interfaces';
import { setToken } from '../../redux/actions';

export const SessionGuard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken = useSelector(
    (current: IGlobalStates) => current.auth.accessToken,
  );
  const refreshToken = useSelector(
    (current: IGlobalStates) => current.auth.refreshToken,
  );

  useEffect(() => {
    if (!isSessionExpired(accessToken, refreshToken)) {
      return;
    }

    dispatch(setToken('', ''));

    if (PROTECTED_PATHS.includes(router.pathname)) {
      router.replace('/login?expired=1');
    }
  }, [accessToken, refreshToken, dispatch, router]);

  return null;
};
