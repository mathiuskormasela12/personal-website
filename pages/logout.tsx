// =========== Logout
// import all modules
import { useEffect } from 'react';
import { type NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setToken } from '../redux/actions';

const Logout: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setToken('', ''));
    router.push('/');
  }, [dispatch, router]);

  return null;
};

export default Logout;
