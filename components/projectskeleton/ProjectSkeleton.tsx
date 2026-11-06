import React from 'react';
import { SkeletonBar } from '../skeletonbar/SkeletonBar';
import * as Styled from './projectskeleton.styled';

export const ProjectSkeleton: React.FC = () => (
  <Styled.Wrapper role="status" aria-label="Loading project">
    <Styled.Title>
      <SkeletonBar width="70%" height="2.2rem" />
    </Styled.Title>
    <Styled.Picture>
      <SkeletonBar width="100%" height="100%" radius="1.2rem" />
    </Styled.Picture>
    <Styled.Tags>
      <SkeletonBar width="5rem" height="1.6rem" />
      <SkeletonBar width="6.5rem" height="1.6rem" />
      <SkeletonBar width="4.5rem" height="1.6rem" />
    </Styled.Tags>
    <Styled.Lines>
      <SkeletonBar width="95%" height="0.9rem" />
      <SkeletonBar width="88%" height="0.9rem" />
      <SkeletonBar width="60%" height="0.9rem" />
    </Styled.Lines>
  </Styled.Wrapper>
);
