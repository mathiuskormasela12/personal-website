// ========== Forgot
// import all modules
import React, { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  });
  const { query } = useRouter();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.token) {
      setState((current) => ({
        ...current,
        screen: 'RESET',
      }));
    } else {
      setState((current) => ({
        ...current,
        screen: 'FORGOT',
      }));
    }
  };

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
                        <Button type="submit" size="md" fluid>
                          Send
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
                        <Button type="submit" size="md" fluid>
                          Reset
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
