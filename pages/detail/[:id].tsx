// ========== Detail
// import all modules
import React, { Fragment, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as Styled from '../../styles';

// import all components
import {
  Container,
  Head,
  Navbar,
  Footer,
} from '../../components';
import { IGlobalStates, IProjects } from '../../interfaces';

const Detail: NextPage = () => {
  const router = useRouter();
  const { id = 1 } = router.query;

  const projectsRedux: IProjects[] = useSelector(
    (current: IGlobalStates) => current.projects.projects,
  );

  const [projects, setProjects] = useState<IProjects[]>([]);

  useEffect(() => {
    const modified = projectsRedux.filter((item) => item.id === Number(id));
    // window.alert(id);
    // console.log()
    setProjects(modified);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Head title="Detail" />
      <Styled.HeroDetail>
        <Navbar />
        <Styled.HeroDetailBody>
          <Container>
            <Styled.HeroDetailHeader>
              <Styled.HeroDetailTitle>
                Belajar Node Js
              </Styled.HeroDetailTitle>
            </Styled.HeroDetailHeader>
            <Styled.HeroDetailMain>
              <Styled.ImageContainerHeroDetailFlex>
                <Styled.ImageContainerHeroDetail>
                  <Image
                    src={projects.length > 0 ? projects[0].img : '/aja'}
                    alt={projects.length > 0 ? projects[0].title.slice(0, 5) : '-'}
                    layout="responsive"
                    width={550}
                    height={320}
                  />
                </Styled.ImageContainerHeroDetail>
              </Styled.ImageContainerHeroDetailFlex>
              <Styled.HeroDetailText>
                {projects.length > 0 ? projects[0].description : '-'}
              </Styled.HeroDetailText>
            </Styled.HeroDetailMain>
          </Container>
        </Styled.HeroDetailBody>
      </Styled.HeroDetail>
      <Footer />
    </Fragment>
  );
};

export default Detail;
