// ========== Forgot
// import all modules
import React, { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import { IForgotPasswordBody, IGlobalStates, IResetPasswordBody } from '../interfaces';
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

const Forgot: NextPage = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    textFieldErrorMessageEmail: '',
    textFieldErrorMessagePassword: '',
    textFieldErrorMessageRepeatPassword: '',
    loading: false,
  });
  const { query, push } = useRouter();
  const accessToken: string = useSelector((
    currentState: IGlobalStates,
  ) => currentState.auth.accessToken);
  const refreshToken: string = useSelector((
    currentState: IGlobalStates,
  ) => currentState.auth.refreshToken);

  if (accessToken !== '' && refreshToken !== '') {
    push('/');
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

  const handleSendForgotPasswordLink = async () => {
    setState((currentState) => ({
      ...currentState,
      loading: true,
    }));

    const body: IForgotPasswordBody = {
      email: state.email,
    };

    try {
      const { data } = await Services.forgotPassword(body);

      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: data.message,
        didClose() {
          setState((current) => ({
            ...current,
            loading: false,
          }));
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

  const handleResetPassword = async () => {
    const body: IResetPasswordBody = {
      password: state.password,
      repeatPassword: state.repeatPassword,
    };

    if (query.token) {
      setState((current) => ({
        ...current,
        loading: true,
      }));
      const decode: any = jwtDecode(String(query.token));

      try {
        const { data } = await Services.resetPassword(Number(decode.id), body);

        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: data.message,
          didClose() {
            setState((current) => ({
              ...current,
              loading: false,
            }));
            push('/login');
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
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.token) {
      handleResetPassword();
    } else {
      handleSendForgotPasswordLink();
    }
  };

  const buttonDisabledForgotPassword: boolean = state.loading || state.email === '' || state.textFieldErrorMessageEmail !== '';
  const buttonDisabledResetPassword: boolean = state.loading || state.password === '' || state.repeatPassword === '' || state.textFieldErrorMessagePassword !== '' || state.textFieldErrorMessageRepeatPassword !== '';

  return (
    <Fragment>
      <Head title="Forgot Password" />
      <Styled.HeroCreateForgot>
        <Navbar />
        <Styled.HeroCreateForgotBody>
          <Container
            inheritHeight
            customSize={{
              value: 80,
            }}
          >
            <Styled.HeroCreateForgotFlex>
              <Styled.HeroCreateForgotCol>
                <Styled.HeroCreateForgotImageContainer>
                  <Image
                    src="/icons/Forgot.svg"
                    width={250}
                    height={250}
                    layout="responsive"
                    alt="Create Forgot"
                  />
                </Styled.HeroCreateForgotImageContainer>
              </Styled.HeroCreateForgotCol>
              <Styled.HeroCreateForgotCol>
                <Styled.HeroCreateForgotTitle>
                  {!query.token ? 'Forgot Password' : 'Reset Password'}
                </Styled.HeroCreateForgotTitle>
                <Styled.HeroCreateForgotForm onSubmit={handleSubmit}>
                  {!query.token ? (
                    <Fragment>
                      <Styled.HeroCreateForgotControl>
                        <Styled.HeroCreateForgotLabel htmlFor="email">
                          Email
                        </Styled.HeroCreateForgotLabel>
                        <Styled.HeroCreateForgotField>
                          <TextField
                            placeholder="Type your email..."
                            type="email"
                            id="email"
                            value={state.email}
                            invalidMessage={state.textFieldErrorMessageEmail.length > 0
                              ? state.textFieldErrorMessageEmail : undefined}
                            onChange={(event) => handleChange('email', event)}
                          />
                        </Styled.HeroCreateForgotField>
                      </Styled.HeroCreateForgotControl>
                      <Styled.HeroCreateForgotControl>
                        <Button
                          type="submit"
                          size="md"
                          fluid
                          disabled={buttonDisabledForgotPassword}
                        >
                          {state.loading ? 'Loading...' : 'Send'}
                        </Button>
                      </Styled.HeroCreateForgotControl>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Styled.HeroCreateForgotControl>
                        <Styled.HeroCreateForgotLabel htmlFor="password">
                          New Password
                        </Styled.HeroCreateForgotLabel>
                        <Styled.HeroCreateForgotField>
                          <TextField
                            placeholder="Type your new password..."
                            type="password"
                            id="password"
                            value={state.password}
                            invalidMessage={state.textFieldErrorMessagePassword.length > 0
                              ? state.textFieldErrorMessagePassword : undefined}
                            onChange={(event) => handleChange('password', event)}
                          />
                        </Styled.HeroCreateForgotField>
                      </Styled.HeroCreateForgotControl>
                      <Styled.HeroCreateForgotControl>
                        <Styled.HeroCreateForgotLabel htmlFor="repeat-password">
                          Repeat New Password
                        </Styled.HeroCreateForgotLabel>
                        <Styled.HeroCreateForgotField>
                          <TextField
                            placeholder="Repeat your new password..."
                            type="password"
                            id="repeat-password"
                            value={state.repeatPassword}
                            invalidMessage={state.textFieldErrorMessageRepeatPassword.length > 0
                              ? state.textFieldErrorMessageRepeatPassword : undefined}
                            onChange={(event) => handleChange('repeatPassword', event)}
                          />
                        </Styled.HeroCreateForgotField>
                      </Styled.HeroCreateForgotControl>
                      <Styled.HeroCreateForgotControl>
                        <Button
                          type="submit"
                          size="md"
                          fluid
                          disabled={buttonDisabledResetPassword}
                        >
                          {state.loading ? 'Loading...' : 'Reset'}
                        </Button>
                      </Styled.HeroCreateForgotControl>
                    </Fragment>
                  )}
                </Styled.HeroCreateForgotForm>
              </Styled.HeroCreateForgotCol>
            </Styled.HeroCreateForgotFlex>
          </Container>
        </Styled.HeroCreateForgotBody>
      </Styled.HeroCreateForgot>
      <Footer />
    </Fragment>
  );
};

export default Forgot;
