// ========== Register
// import all modules
import React, { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { IGlobalStates, IRegisterBody } from '../interfaces';
import Services from '../services';
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

const Register: NextPage = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    textFieldErrorMessageEmail: '',
    textFieldErrorMessagePassword: '',
    textFieldErrorMessageRepeatPassword: '',
    loading: false,
  });

  const router = useRouter();
  const accessToken: string = useSelector((states: IGlobalStates) => states.auth.accessToken);
  const refreshToken: string = useSelector((states: IGlobalStates) => states.auth.refreshToken);

  if (accessToken === '' && refreshToken === '') {
    router.push('/login');
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

      case 'repeatPassword':
        if (!e.target.value.match(/[a-z]/g) || !e.target.value.match(/[A-Z]/g) || !e.target.value.match(/[0-9]/gi) || !e.target.value.match(/\W/gi)) {
          setState((currentState) => ({
            ...currentState,
            textFieldErrorMessageRepeatPassword: 'Repeat password is too weak',
            [name]: e.target.value,
          }));
        } else if (state.password !== e.target.value) {
          setState((currentState) => ({
            ...currentState,
            textFieldErrorMessageRepeatPassword: 'The password does not match',
            [name]: e.target.value,
          }));
        } else {
          setState((currentState) => ({
            ...currentState,
            textFieldErrorMessageRepeatPassword: '',
            [name]: e.target.value,
          }));
        }
        break;

      default:
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((currentState) => ({
      ...currentState,
      loading: true,
    }));

    const body: IRegisterBody = {
      email: state.email,
      password: state.password,
      repeatPassword: state.repeatPassword,
    };

    try {
      const { data } = await Services.register(body);

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

  const buttonDisabled: boolean = state.loading || state.email === '' || state.password === '' || state.repeatPassword === '' || state.textFieldErrorMessageEmail !== '' || state.textFieldErrorMessagePassword !== '' || state.textFieldErrorMessageRepeatPassword !== '';

  return (
    <Fragment>
      <Head title="Sign Up" />
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
                    src="/icons/register.svg"
                    width={250}
                    height={250}
                    layout="responsive"
                    alt="Create Auth"
                  />
                </Styled.HeroCreateAuthImageContainer>
              </Styled.HeroCreateAuthCol>
              <Styled.HeroCreateAuthCol>
                <Styled.HeroCreateAuthTitle>
                  Create an Account
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
                    <Styled.HeroCreateAuthLabel htmlFor="repeat-password">
                      Repeat Password
                    </Styled.HeroCreateAuthLabel>
                    <Styled.HeroCreateAuthField>
                      <TextField
                        placeholder="Repeat Password..."
                        type="password"
                        id="repeat-password"
                        value={state.repeatPassword}
                        invalidMessage={state.textFieldErrorMessageRepeatPassword.length > 0
                          ? state.textFieldErrorMessageRepeatPassword : undefined}
                        onChange={(event) => handleChange('repeatPassword', event)}
                      />
                    </Styled.HeroCreateAuthField>
                  </Styled.HeroCreateAuthControl>
                  <Styled.HeroCreateAuthControl>
                    <Styled.FormLink onClick={() => router.push('/login')}>
                      Already have an account ?
                    </Styled.FormLink>
                  </Styled.HeroCreateAuthControl>
                  <Styled.HeroCreateAuthControl>
                    <Button type="submit" size="md" fluid disabled={buttonDisabled}>
                      {state.loading ? 'Loading...' : 'Create'}
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

export default Register;
