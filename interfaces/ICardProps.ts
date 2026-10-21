// ========== ICardProps
// import all modules
import React from 'react';
import { ITechnology } from './ITechnology';

export interface ICardProps {
  title: string;
  description: string;
  img: string;
  technologies: ITechnology[];
  onClick: React.MouseEventHandler<HTMLElement>;
}
