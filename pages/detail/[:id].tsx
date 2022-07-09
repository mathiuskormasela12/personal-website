// ========== Detail
// import all modules
import React, { Fragment, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as Styled from '../../styles';

// import all components
import {
  Container,
  Head,
  Navbar,
  Footer,
  Placeholder,
} from '../../components';
import { setProject } from '../../redux/actions';
import { IGlobalStates, IProjects } from '../../interfaces';

const Detail: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const project: IProjects = useSelector((current: IGlobalStates) => current.projects.project);

  useEffect(() => {
    if (router.isReady) {
      dispatch(setProject(Number(router.query[':id'])));
    }

    return () => {
      dispatch({
        type: 'SET_PROJECT',
        payload: {
          data: {
            project: {
              id: 0,
              title: '',
              technologies: [],
              description: '',
              img: '',
            },
          },
        },
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <Fragment>
      <Head title="Detail" />
      <Styled.HeroDetail>
        <Navbar />
        <Styled.HeroDetailBody>
          <Container>
            <Placeholder isProject>
              <Fragment>
                <Styled.HeroDetailHeader>
                  <Styled.HeroDetailTitle>
                    {project.title}
                  </Styled.HeroDetailTitle>
                </Styled.HeroDetailHeader>
                <Styled.HeroDetailMain>
                  <Styled.ImageContainerHeroDetailFlex>
                    <Styled.ImageContainerHeroDetail>
                      <Image
                        src={project.img ? project.img : '/'}
                        alt={project.title}
                        layout="responsive"
                        width={550}
                        height={320}
                      />
                    </Styled.ImageContainerHeroDetail>
                  </Styled.ImageContainerHeroDetailFlex>
                  <Styled.HeroDetailText>
                    {project.description}
                  </Styled.HeroDetailText>
                </Styled.HeroDetailMain>
              </Fragment>
            </Placeholder>
          </Container>
        </Styled.HeroDetailBody>
      </Styled.HeroDetail>
      <Footer />
    </Fragment>
  );
};

export default Detail;
