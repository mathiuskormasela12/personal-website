import React from 'react';
import { ISkeletonBarProps } from '../../interfaces';
import * as Styled from './skeletonbar.styled';

export const SkeletonBar: React.FC<ISkeletonBarProps> = ({
  width,
  height,
  radius = '999px',
}) => (
  <Styled.Bar aria-hidden $width={width} $height={height} $radius={radius} />
);
