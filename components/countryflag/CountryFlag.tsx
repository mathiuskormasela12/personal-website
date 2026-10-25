import React from 'react';
import { ICountryFlagProps } from '../../interfaces';
import * as Styled from './countryflag.styled';

export const CountryFlag: React.FC<ICountryFlagProps> = ({ country }) => (
  <Styled.Flag
    src={`/flags/${country}.svg`}
    width={21}
    height={14}
    alt=""
    unoptimized
  />
);
