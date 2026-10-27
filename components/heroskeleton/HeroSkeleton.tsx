import React from 'react';
import { IHeroSkeletonProps } from '../../interfaces';
import { HeroHomeSubtitle, HeroHomeTitle } from '../../styles/home.styled';
import { PreviewLink } from '../herocontent/herocontent.styled';
import { SkeletonBar } from '../skeletonbar/SkeletonBar';
import * as Styled from './heroskeleton.styled';

export const HeroSkeleton: React.FC<IHeroSkeletonProps> = ({
  preview = false,
}) => (
  <div role="status" aria-label="Loading">
    <HeroHomeTitle as={preview ? 'h2' : 'div'} aria-hidden data-skeleton-text>
      <Styled.Title>
        <Styled.Line>
          <SkeletonBar width="92%" height="0.72em" radius="0.24em" />
        </Styled.Line>
        <Styled.SecondTitleLine>
          <SkeletonBar width="62%" height="0.72em" radius="0.24em" />
        </Styled.SecondTitleLine>
      </Styled.Title>
    </HeroHomeTitle>
    <HeroHomeSubtitle as="div" aria-hidden data-skeleton-text>
      <Styled.Line>
        <SkeletonBar width="95%" height="0.7em" />
      </Styled.Line>
      <Styled.Line>
        <SkeletonBar width="55%" height="0.7em" />
      </Styled.Line>
    </HeroHomeSubtitle>
    <SkeletonBar width="10rem" height="3rem" />
    {preview && (
      <PreviewLink as="div" aria-hidden data-skeleton-link>
        <Styled.Line>
          <SkeletonBar width="60%" height="0.7em" />
        </Styled.Line>
      </PreviewLink>
    )}
  </div>
);
