// ========== TextField
// import all modules
import React, { Fragment } from 'react';
import { type NextPage } from 'next';
import * as Styled from './textfield.styled';
import { ITextFieldProps } from '../../interfaces';

export const TextField: NextPage<ITextFieldProps> = (props) => {
  const { invalidMessage } = props;

  return (
    <Fragment>
      <Styled.Input {...props} />
      <Styled.ErrorMessage>
        {invalidMessage}
      </Styled.ErrorMessage>
    </Fragment>
  );
};
