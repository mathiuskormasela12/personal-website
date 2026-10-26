// ========== Home
// import all modules
import React, { Fragment, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as Styled from '../styles';

// import all components
import {
  Head,
  Navbar,
  Container,
  Card,
  HeroContent,
  SkillsSection,
  Footer,
  Pagination,
  Placeholder,
} from '../components';
import { setProjects } from '../redux/actions';
import { IGlobalStates, IHeroPageProps, IProjects } from '../interfaces';
import { getHeroServerSideProps } from '../helpers';
import { useProfile } from '../hooks/useProfile';

const Home: NextPage<IHeroPageProps> = ({ hero }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useProfile();
  const projects: IProjects[] = useSelector(
    (current: IGlobalStates) => current.projects.projects,
  );
  const totalPages: number = useSelector(
    (current: IGlobalStates) => current.projects.totalPages,
  );

  const { page = 1 } = router.query;

  useEffect(() => {
    dispatch(setProjects(Number(page)));
  }, [dispatch, page]);

  return (
    <Fragment>
      <Head title="Home" />
      <Styled.HeroHome>
        <Navbar />
        <Styled.HeroWelcome>
          <Container>
            <Styled.HeroHomeRow>
              <Styled.HeroHomeWelcomeContent>
                <HeroContent hero={hero} />
              </Styled.HeroHomeWelcomeContent>
              <Styled.IllustrationFrame>
                <Image
                  src="/icons/hero-img.svg"
                  alt="Hero Image"
                  width={400}
                  height={350}
                  priority
                />
              </Styled.IllustrationFrame>
            </Styled.HeroHomeRow>
          </Container>
        </Styled.HeroWelcome>
        <Styled.HomeSkills id="skills">
          <Container>
            <SkillsSection
              skills={profile.skills}
              description={profile.skillsDescription}
            />
          </Container>
        </Styled.HomeSkills>
        <Styled.HeroProject id="projects">
          <Container>
            <Styled.HeroProjectHeader>
              <Styled.SectionTitle>
                <Styled.PrimaryText>Latest Projects</Styled.PrimaryText> Updates
              </Styled.SectionTitle>
              <Styled.SectionLead>
                Let&apos;s write our future with code
              </Styled.SectionLead>
            </Styled.HeroProjectHeader>
            <Styled.HeroProjectMain>
              <Styled.HeroProjectMainRow data-grid>
                <Placeholder>
                  <Fragment>
                    {projects.map((item) => (
                      <div key={item.id.toString()}>
                        <Card
                          title={item.title}
                          description={item.description}
                          img={item.img}
                          technologies={item.technologies}
                          onClick={() => {
                            router.push(`/detail/${String(item.id)}`);
                          }}
                        />
                      </div>
                    ))}
                  </Fragment>
                </Placeholder>
              </Styled.HeroProjectMainRow>
              {totalPages > 0 && (
                <Pagination totalPages={totalPages} page={Number(page)} />
              )}
            </Styled.HeroProjectMain>
          </Container>
        </Styled.HeroProject>
        <Footer />
      </Styled.HeroHome>
    </Fragment>
  );
};

export const getServerSideProps = getHeroServerSideProps;

export default Home;
