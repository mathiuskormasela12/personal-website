// ========== Head
// import all modules
import React from 'react';
import type { NextPage } from 'next';
import NextHead from 'next/head';
import { IHeadComponentProps } from '../../interfaces';

export const Head: NextPage<IHeadComponentProps> = (props) => {
  const {
    title,
  } = props;

  return (
    <NextHead>
      <title>
        {title}
        {' '}
        | My Personal Website
      </title>
      <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
    </NextHead>
  );
};
