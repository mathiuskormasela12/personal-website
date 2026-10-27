// ========== Detail
// import all modules
import React, { Fragment, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as Styled from '../../styles';

// import all components
import {
  Container,
  Head,
  Navbar,
  Footer,
  ProjectContent,
  ProjectSkeleton,
} from '../../components';
import { setProject } from '../../redux/actions';
import { IGlobalStates, IProjects } from '../../interfaces';

const Detail: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const project: IProjects = useSelector(
    (current: IGlobalStates) => current.projects.project,
  );
  const requestedId = Number(router.query[':id']);
  const isLoaded = project.id === requestedId;
  const [isRequestDone, setIsRequestDone] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      Promise.resolve(dispatch(setProject(requestedId))).then(() =>
        setIsRequestDone(true),
      );
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
            <Styled.HeroDetailArticle>
              {isLoaded && (
                <ProjectContent
                  title={project.title}
                  description={project.description}
                  img={project.img || null}
                  technologies={project.technologies.map((item) => item.name)}
                />
              )}
              {!isLoaded && isRequestDone && (
                <Styled.HeroDetailMissing>
                  Project not found
                </Styled.HeroDetailMissing>
              )}
              {!isLoaded && !isRequestDone && <ProjectSkeleton />}
            </Styled.HeroDetailArticle>
          </Container>
        </Styled.HeroDetailBody>
      </Styled.HeroDetail>
      <Footer />
    </Fragment>
  );
};

export default Detail;
