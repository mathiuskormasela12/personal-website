import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { IHeroContentProps } from '../../interfaces';
import { HeroHomeSubtitle, HeroHomeTitle } from '../../styles/home.styled';
import { Button } from '../button/Button';
import * as Styled from './herocontent.styled';

export const HeroContent: React.FC<IHeroContentProps> = ({
  hero,
  preview = false,
}) => {
  const router = useRouter();

  return (
    <Fragment>
      <HeroHomeTitle as={preview ? 'h2' : 'h1'}>
        {hero.titlePrefix}{' '}
        <Styled.Highlight>{hero.titleHighlight}</Styled.Highlight>
        {hero.titleSuffix}
      </HeroHomeTitle>
      <HeroHomeSubtitle>{hero.subtitle}</HeroHomeSubtitle>
      <Button
        type="button"
        size="md"
        rounded
        disabled={preview}
        onClick={() => router.push(hero.buttonUrl)}
      >
        {hero.buttonText}
      </Button>
      {preview && <Styled.PreviewLink>{hero.buttonUrl}</Styled.PreviewLink>}
    </Fragment>
  );
};
