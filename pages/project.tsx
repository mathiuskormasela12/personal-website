// ========== Project
// import all modules
import React, { Fragment, useState, useRef } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as Styled from '../styles';

// import all components
import {
  Head,
  Navbar,
  Container,
  Footer,
  TextField,
  LongText,
  Button,
} from '../components';
import { IGlobalStates } from '../interfaces';

const Project: NextPage = () => {
  const [state, setState] = useState({
    projectName: '',
    technologies: '',
    projectDescription: '',
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const accessToken: string = useSelector((states: IGlobalStates) => states.auth.accessToken);
  const refreshToken: string = useSelector((states: IGlobalStates) => states.auth.refreshToken);

  const handleChange = 	(
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState((currentState) => ({
      ...currentState,
      [name]: e.target.value,
    }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fileRef.current?.click();
  };

  if (accessToken === '' && refreshToken === '') {
    router.push('/login');
  }

  return (
    <Fragment>
      <Head title="Create a Project" />
      <Styled.HeroCreateProject>
        <Navbar />
        <Styled.HeroCreateProjectBody>
          <Container
            inheritHeight
            customSize={{
              value: 80,
            }}
          >
            <Styled.HeroCreateProjectFlex>
              <Styled.HeroCreateProjectCol>
                <Styled.HeroCreateProjectImageContainer>
                  <Image
                    src="/icons/create-project-img.svg"
                    width={250}
                    height={250}
                    layout="responsive"
                    alt="Create Project"
                  />
                </Styled.HeroCreateProjectImageContainer>
              </Styled.HeroCreateProjectCol>
              <Styled.HeroCreateProjectCol>
                <Styled.HeroCreateProjectTitle>
                  Create a Project
                </Styled.HeroCreateProjectTitle>
                <Styled.HeroCreateProjectForm onSubmit={handleSave}>
                  <Styled.HeroCreateProjectControl>
                    <Styled.HeroCreateProjectLabel htmlFor="project-name">
                      Project Name
                    </Styled.HeroCreateProjectLabel>
                    <Styled.HeroCreateProjectField>
                      <TextField
                        placeholder="Project Name..."
                        type="text"
                        id="project-name"
                        value={state.projectName}
                        onChange={(event) => handleChange('projectName', event)}
                      />
                    </Styled.HeroCreateProjectField>
                  </Styled.HeroCreateProjectControl>
                  <Styled.HeroCreateProjectControl>
                    <Styled.HeroCreateProjectLabel htmlFor="technology">
                      Technologies (example : HTML, CSS)
                    </Styled.HeroCreateProjectLabel>
                    <Styled.HeroCreateProjectField>
                      <TextField
                        placeholder="Technologies..."
                        type="text"
                        id="technology"
                        value={state.technologies}
                        onChange={(event) => handleChange('technologies', event)}
                      />
                    </Styled.HeroCreateProjectField>
                  </Styled.HeroCreateProjectControl>
                  <Styled.HeroCreateProjectControl>
                    <Styled.HeroCreateProjectLabel htmlFor="project-description">
                      Project Description
                    </Styled.HeroCreateProjectLabel>
                    <Styled.HeroCreateProjectField>
                      <LongText
                        placeholder="Project Description..."
                        id="project-description"
                        value={state.projectDescription}
                        onChange={(event) => handleChange('projectDescription', event)}
                      />
                    </Styled.HeroCreateProjectField>
                  </Styled.HeroCreateProjectControl>
                  <Styled.HeroCreateProjectControl>
                    <Styled.File type="file" ref={fileRef} />
                    <Button type="submit" size="md" fluid>
                      Save
                    </Button>
                  </Styled.HeroCreateProjectControl>
                </Styled.HeroCreateProjectForm>
              </Styled.HeroCreateProjectCol>
            </Styled.HeroCreateProjectFlex>
          </Container>
        </Styled.HeroCreateProjectBody>
      </Styled.HeroCreateProject>
      <Footer />
    </Fragment>
  );
};

export default Project;
