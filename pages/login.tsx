// ========== Login
// import all modules
import React, { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as Styled from '../styles';

// import all components
import {
  Head,
  Navbar,
  Container,
  Footer,
  TextField,
  Button,
} from '../components';
import Services from '../services';
import { IGlobalStates, ILoginBody } from '../interfaces';
import { setToken } from '../redux/actions';

const Login: NextPage = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    textFieldErrorMessageEmail: '',
    textFieldErrorMessagePassword: '',
    loading: false,
  });
  const accessToken: string = useSelector((
    currentState: IGlobalStates,
  ) => currentState.auth.accessToken);
  const refreshToken: string = useSelector((
    currentState: IGlobalStates,
  ) => currentState.auth.refreshToken);

  const router = useRouter();
  const dispatch = useDispatch();

  if (accessToken !== '' && refreshToken !== '' && !state.loading) {
    router.push('/');
  }

  const handleChange = 	(
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    switch (name) {
      case 'email':
        if (!e.target.value.match(/@/gi)) {
          setState((currentState) => ({
            ...currentState,
            textFieldErrorMessageEmail: 'Invalid email',
            [name]: e.target.value,
          }));
        } else {
          setState((currentState) => ({
            ...currentState,
            textFieldErrorMessageEmail: '',
            [name]: e.target.value,
          }));
        }
        break;

      case 'password':
        if (!e.target.value.match(/[a-z]/g) || !e.target.value.match(/[A-Z]/g) || !e.target.value.match(/[0-9]/gi) || !e.target.value.match(/\W/gi)) {
          setState((currentState) => ({
            ...currentState,
            textFieldErrorMessagePassword: 'Password is too weak',
            [name]: e.target.value,
          }));
        } else {
          setState((currentState) => ({
            ...currentState,
            textFieldErrorMessagePassword: '',
            [name]: e.target.value,
          }));
        }
        break;

      default:
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleLogin = async () => {
    setState((currentState) => ({
      ...currentState,
      loading: true,
    }));

    const body: ILoginBody = {
      email: state.email,
      password: state.password,
    };

    try {
      const { data } = await Services.login(body);

      dispatch(setToken(data.results.accessToken, data.results.refreshToken));

      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: data.message,
        didClose() {
          setState((current) => ({
            ...current,
            loading: false,
          }));
          router.push('/');
        },
      });
    } catch (err: any) {
      dispatch(setToken('', ''));

      setState((currentState) => ({
        ...currentState,
        loading: false,
      }));

      Swal.fire({
        title: 'Failed',
        icon: 'error',
        text: err.message,
      });
    }
  };

  const buttonDisabled: boolean = state.loading || state.email === '' || state.password === '' || state.textFieldErrorMessageEmail !== '' || state.textFieldErrorMessagePassword !== '';

  return (
    <Fragment>
      <Head title="Sign In" />
      <Styled.HeroCreateAuth>
        <Navbar />
        <Styled.HeroCreateAuthBody>
          <Container
            inheritHeight
            customSize={{
              value: 80,
            }}
          >
            <Styled.HeroCreateAuthFlex>
              <Styled.HeroCreateAuthCol>
                <Styled.HeroCreateAuthImageContainer>
                  <Image
                    src="/icons/login.svg"
                    width={250}
                    height={250}
                    layout="responsive"
                    alt="Create Auth"
                  />
                </Styled.HeroCreateAuthImageContainer>
              </Styled.HeroCreateAuthCol>
              <Styled.HeroCreateAuthCol>
                <Styled.HeroCreateAuthTitle>
                  Sign In to Continue
                </Styled.HeroCreateAuthTitle>
                <Styled.HeroCreateAuthForm onSubmit={handleSubmit}>
                  <Styled.HeroCreateAuthControl>
                    <Styled.HeroCreateAuthLabel htmlFor="email">
                      Email
                    </Styled.HeroCreateAuthLabel>
                    <Styled.HeroCreateAuthField>
                      <TextField
                        placeholder="Email..."
                        type="email"
                        id="email"
                        value={state.email}
                        invalidMessage={state.textFieldErrorMessageEmail.length > 0
                          ? state.textFieldErrorMessageEmail : undefined}
                        onChange={(event) => handleChange('email', event)}
                      />
                    </Styled.HeroCreateAuthField>
                  </Styled.HeroCreateAuthControl>
                  <Styled.HeroCreateAuthControl>
                    <Styled.HeroCreateAuthLabel htmlFor="password">
                      Password
                    </Styled.HeroCreateAuthLabel>
                    <Styled.HeroCreateAuthField>
                      <TextField
                        placeholder="Password..."
                        type="password"
                        id="password"
                        value={state.password}
                        invalidMessage={state.textFieldErrorMessagePassword.length > 0
                          ? state.textFieldErrorMessagePassword : undefined}
                        onChange={(event) => handleChange('password', event)}
                      />
                    </Styled.HeroCreateAuthField>
                  </Styled.HeroCreateAuthControl>
                  <Styled.HeroCreateAuthControl>
                    <Styled.FormLink onClick={() => router.push('/forgot')}>
                      Forgot Password ?
                    </Styled.FormLink>
                  </Styled.HeroCreateAuthControl>
                  <Styled.HeroCreateAuthControl>
                    <Button
                      type="submit"
                      size="md"
                      disabled={buttonDisabled}
                      fluid
                      onClick={handleLogin}
                    >
                      {state.loading ? 'Loading...' : ' Sign In'}
                    </Button>
                  </Styled.HeroCreateAuthControl>
                </Styled.HeroCreateAuthForm>
              </Styled.HeroCreateAuthCol>
            </Styled.HeroCreateAuthFlex>
          </Container>
        </Styled.HeroCreateAuthBody>
      </Styled.HeroCreateAuth>
      <Footer />
    </Fragment>
  );
};

export default Login;
