// ========== Project
// import all modules
import React, { Fragment } from 'react';
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
  LongText,
  Button,
} from '../components';

const Project: NextPage = () => (
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
              <Styled.HeroCreateProjectForm>
                <Styled.HeroCreateProjectControl>
                  <Styled.HeroCreateProjectLabel htmlFor="project-name">
                    Project Name
                  </Styled.HeroCreateProjectLabel>
                  <Styled.HeroCreateProjectField>
                    <TextField placeholder="Project Name..." type="text" id="project-name" />
                  </Styled.HeroCreateProjectField>
                </Styled.HeroCreateProjectControl>
                <Styled.HeroCreateProjectControl>
                  <Styled.HeroCreateProjectLabel htmlFor="technology">
                    Technologies (example : HTML, CSS)
                  </Styled.HeroCreateProjectLabel>
                  <Styled.HeroCreateProjectField>
                    <TextField placeholder="Technologies..." type="text" id="technology" />
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
                    />
                  </Styled.HeroCreateProjectField>
                </Styled.HeroCreateProjectControl>
                <Styled.HeroCreateProjectControl>
                  <Button type="button" size="md" fluid>
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

export default Project;
