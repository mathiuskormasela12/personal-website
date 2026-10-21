// ========== Container
// import all modules
import React from 'react';
import { IContainerProps } from '../../interfaces';
import { ContainerStyle } from './container.styled';

export const Container: React.FC<IContainerProps> = (props) => {
  const { children, ...rest } = props;

  return <ContainerStyle {...rest}>{children}</ContainerStyle>;
};
