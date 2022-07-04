// ========== TextField
// import all modules
import React from 'react';
import { type NextPage } from 'next';
import * as Styled from './textfield.styled';
import { ITextFieldProps } from '../../interfaces';

export const TextField: NextPage<ITextFieldProps> = (props) => (
  <Styled.Input {...props} />
);
