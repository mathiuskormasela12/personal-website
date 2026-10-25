import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IPasswordFieldProps } from '../../interfaces';
import { TextField } from '../textfield/TextField';
import * as Styled from './passwordfield.styled';

export const PasswordField: React.FC<IPasswordFieldProps> = (props) => {
  const { id, disabled } = props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Styled.Wrapper>
      <TextField {...props} type={isVisible ? 'text' : 'password'} />
      <Styled.ToggleButton
        type="button"
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        aria-controls={id}
        disabled={disabled}
        onClick={() => setIsVisible((current) => !current)}
      >
        {isVisible ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
      </Styled.ToggleButton>
    </Styled.Wrapper>
  );
};
