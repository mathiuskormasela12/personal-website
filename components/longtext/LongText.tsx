// ========== LongText
// import all modules
import React, { Fragment } from 'react';
import { type NextPage } from 'next';
import * as Styled from './longtext.styled';
import { ErrorMessage } from '../textfield/textfield.styled';
import { ILongTextProps } from '../../interfaces';

export const LongText: NextPage<ILongTextProps> = (props) => {
  const { invalidMessage } = props;

  return (
    <Fragment>
      <Styled.TextArea {...props} />
      {invalidMessage && <ErrorMessage>{invalidMessage}</ErrorMessage>}
    </Fragment>
  );
};
