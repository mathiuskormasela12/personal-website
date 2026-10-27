import React from 'react';
import { type NextPage } from 'next';
import { IButtonProps } from '../../interfaces';
import { Spinner } from '../spinner/Spinner';
import * as Styled from './button.styled';

export const Button: NextPage<IButtonProps> = (props) => {
  const { children, loading = false, disabled = false, ...rest } = props;

  return (
    <Styled.Button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && <Spinner />}
      <span>{children}</span>
    </Styled.Button>
  );
};
