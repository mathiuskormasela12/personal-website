// ========== Login
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

const Login: NextPage = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

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
  };

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
                    <Button type="submit" size="md" fluid>
                      Sign In
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
