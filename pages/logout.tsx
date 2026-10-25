// =========== Logout
// import all modules
import { useEffect } from 'react';
import { type NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { setToken } from '../redux/actions';
import { Colors } from '../themes';

const getReturnPath = (from: unknown): string => {
  if (
    typeof from === 'string' &&
    from.startsWith('/') &&
    !from.startsWith('//') &&
    !from.startsWith('/logout') &&
    !from.includes('\\')
  ) {
    return from;
  }

  return '/';
};

const Logout: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const returnPath = getReturnPath(router.query.from);

  useEffect(() => {
    if (!router.isReady) {
      return undefined;
    }

    let isActive = true;

    Swal.fire({
      title: 'Log out?',
      text: 'You will need to sign in again to edit your site.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Log out',
      cancelButtonText: 'Stay',
      confirmButtonColor: Colors.danger,
      focusCancel: true,
    }).then((result) => {
      if (!isActive) {
        return;
      }

      if (result.isConfirmed) {
        dispatch(setToken('', ''));
        router.replace('/');
      } else {
        router.replace(returnPath);
      }
    });

    return () => {
      isActive = false;
    };
  }, [dispatch, router, returnPath]);

  return null;
};

export default Logout;
