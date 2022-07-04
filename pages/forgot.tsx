// ========== Forgot
// import all modules
import React, { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
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
    screen: 'FORGOT',
  });

  const handleChange = 	(
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState((currentState) => ({
      ...currentState,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (state.screen) {
      case 'FORGOT':
        setState((current) => ({
          ...current,
          screen: 'RESET',
        }));
        break;

      default:
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
                  {state.screen === 'FORGOT' ? 'Forgot Password' : 'Reset Password'}
                </Styled.HeroCreateForgotTitle>
                <Styled.HeroCreateForgotForm onSubmit={handleSubmit}>
                  {state.screen === 'FORGOT' ? (
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
