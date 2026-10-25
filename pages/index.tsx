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
  Button,
  Card,
  Footer,
  Pagination,
  Placeholder,
} from '../components';
import { setProjects } from '../redux/actions';
import { IGlobalStates, IHeroPageProps, IProjects } from '../interfaces';
import { getHeroServerSideProps } from '../helpers';

const Home: NextPage<IHeroPageProps> = ({ hero }) => {
  const router = useRouter();
  const dispatch = useDispatch();
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
          <Container inheritHeight>
            <Styled.HeroHomeRow>
              <Styled.HeroHomeCol>
                <Styled.BalloonContainer
                  customPosition={{
                    top: -7,
                  }}
                  rotate={0}
                  hiddenWhenSize={0}
                >
                  <Image
                    src="/icons/balloon.svg"
                    width={80}
                    height={80}
                    alt="Balloon"
                  />
                </Styled.BalloonContainer>
                <Styled.BalloonContainer
                  customPosition={{
                    top: -5.5,
                    right: 0,
                  }}
                  rotate={270}
                  hiddenWhenSize={0}
                >
                  <Image
                    src="/icons/balloon.svg"
                    width={80}
                    height={80}
                    alt="Balloon"
                  />
                </Styled.BalloonContainer>
                <Styled.BalloonContainer
                  customPosition={{
                    bottom: -5.5,
                    right: 0,
                  }}
                  rotate={100}
                  hiddenWhenSize={0}
                >
                  <Image
                    src="/icons/balloon.svg"
                    width={80}
                    height={80}
                    alt="Balloon"
                  />
                </Styled.BalloonContainer>
                <Styled.HeroHomeWelcomeContent>
                  <Styled.HeroHomeTitle>
                    {hero.titlePrefix}{' '}
                    <Styled.PrimaryText>
                      {hero.titleHighlight}
                    </Styled.PrimaryText>
                    {hero.titleSuffix}
                  </Styled.HeroHomeTitle>
                  <Styled.HeroHomeSubtitle>
                    {hero.subtitle}
                  </Styled.HeroHomeSubtitle>
                  <Button
                    type="button"
                    size="md"
                    rounded
                    onClick={() => {
                      router.push(hero.buttonUrl);
                    }}
                  >
                    {hero.buttonText}
                  </Button>
                </Styled.HeroHomeWelcomeContent>
              </Styled.HeroHomeCol>
              <Styled.HeroHomeCol>
                <Styled.ImageContainer>
                  <Image
                    src="/icons/hero-img.svg"
                    alt="Hero Image"
                    width={400}
                    height={350}
                  />
                </Styled.ImageContainer>
              </Styled.HeroHomeCol>
            </Styled.HeroHomeRow>
          </Container>
        </Styled.HeroWelcome>
        <Styled.HeroProject id="projects">
          <Container>
            <Styled.HeroProjectHeader>
              <Styled.BalloonContainer
                customPosition={{
                  top: -2.2,
                  left: 14,
                }}
                rotate={0}
                hiddenWhenSize={768}
              >
                <Image
                  src="/icons/balloon.svg"
                  width={80}
                  height={80}
                  alt="Balloon"
                />
              </Styled.BalloonContainer>
              <Styled.BalloonContainer
                customPosition={{
                  top: 5,
                  left: 29,
                }}
                rotate={0}
                hiddenWhenSize={0}
              >
                <Image
                  src="/icons/triangle.svg"
                  width={20}
                  height={20}
                  alt="Balloon"
                />
              </Styled.BalloonContainer>
              <Styled.BalloonContainer
                customPosition={{
                  top: 5,
                  right: 29,
                }}
                rotate={157}
                hiddenWhenSize={0}
              >
                <Image
                  src="/icons/triangle.svg"
                  width={20}
                  height={20}
                  alt="Balloon"
                />
              </Styled.BalloonContainer>
              <Styled.HeroHomeTitle>
                <Styled.PrimaryText>Latest Projects</Styled.PrimaryText> Updates
              </Styled.HeroHomeTitle>
              <Styled.HeroHomeSubtitle>
                Let&apos;s write our future with code
              </Styled.HeroHomeSubtitle>
              <Styled.BalloonContainer
                customPosition={{
                  top: -2.2,
                  right: 14,
                }}
                rotate={100}
                hiddenWhenSize={768}
              >
                <Image
                  src="/icons/balloon.svg"
                  width={80}
                  height={80}
                  alt="Balloon"
                />
              </Styled.BalloonContainer>
              <Styled.BalloonContainer
                customPosition={{
                  bottom: 7.5,
                  left: 29,
                }}
                rotate={0}
                hiddenWhenSize={0}
              >
                <Image
                  src="/icons/triangle.svg"
                  width={20}
                  height={20}
                  alt="Balloon"
                />
              </Styled.BalloonContainer>
              <Styled.BalloonContainer
                customPosition={{
                  bottom: 6.5,
                  right: 30,
                }}
                rotate={157}
                hiddenWhenSize={0}
              >
                <Image
                  src="/icons/triangle.svg"
                  width={20}
                  height={20}
                  alt="Balloon"
                />
              </Styled.BalloonContainer>
            </Styled.HeroProjectHeader>
            <Styled.HeroProjectMain>
              <Styled.HeroProjectMainRow>
                <Placeholder>
                  <Fragment>
                    {projects.map((item) => (
                      <Styled.HeroProjectMainCol
                        key={item.id.toString()}
                        count={projects.length}
                      >
                        <Card
                          title={item.title}
                          description={item.description}
                          img={item.img}
                          technologies={item.technologies}
                          onClick={() => {
                            router.push(`/detail/${String(item.id)}`);
                          }}
                        />
                      </Styled.HeroProjectMainCol>
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
