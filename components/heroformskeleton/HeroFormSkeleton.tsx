import React from 'react';
import { IHeroFormSkeletonProps } from '../../interfaces';
import {
  HeroCreateAuthControl,
  HeroCreateAuthField,
  HeroCreateAuthForm,
} from '../../styles/auth.styled';
import { SkeletonBar } from '../skeletonbar/SkeletonBar';
import * as Styled from './heroformskeleton.styled';

export const HeroFormSkeleton: React.FC<IHeroFormSkeletonProps> = ({
  fields,
}) => (
  <HeroCreateAuthForm as="div" role="status" aria-label="Loading">
    {fields.map(({ multiline }, index) => (
      <HeroCreateAuthControl key={String(index)}>
        <Styled.Label data-skeleton-label>
          <SkeletonBar width="6rem" height="0.8rem" />
        </Styled.Label>
        <HeroCreateAuthField data-skeleton-input>
          <SkeletonBar
            width="100%"
            height={multiline ? '8.75rem' : '2.5rem'}
            radius="0.3rem"
          />
        </HeroCreateAuthField>
      </HeroCreateAuthControl>
    ))}
    <HeroCreateAuthControl data-skeleton-button>
      <SkeletonBar width="100%" height="3rem" radius="0.6rem" />
    </HeroCreateAuthControl>
  </HeroCreateAuthForm>
);
