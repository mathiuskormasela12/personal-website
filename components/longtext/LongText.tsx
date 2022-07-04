// ========== LongText
// import all modules
import React from 'react';
import { type NextPage } from 'next';
import * as Styled from './longtext.styled';
import { ILongTextProps } from '../../interfaces';

export const LongText: NextPage<ILongTextProps> = (props) => (
  <Styled.TextArea {...props} />
);
