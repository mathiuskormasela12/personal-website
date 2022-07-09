// ========== Card
// import all modules
import React from 'react';
import { ICardProps } from '../../interfaces';
import { SkillVariants } from '../../types';
import * as Styled from './card.styled';

export const Card: React.FC<ICardProps> = (props) => {
  const {
    title,
    description,
    technologies,
    img,
    onClick,
  } = props;

  return (
    <Styled.Card onClick={onClick}>
      <Styled.Image
        src={img}
        alt={title}
        layout="responsive"
        width={370}
        height={220}
        quality={5}
      />
      <Styled.CardTechnology>
        {technologies.map((item) => {
          const skillsVariant = ['primary', 'secondary', 'tertiary', 'quaternary'];
          let selectedVariant: SkillVariants = 'primary';

          skillsVariant.forEach(() => {
            const rand = Math.floor(Math.random() * 3) + 0;
            if (rand === 0) {
              selectedVariant = 'primary';
            } else if (rand === 1) {
              selectedVariant = 'secondary';
            } else if (rand === 2) {
              selectedVariant = 'tertiary';
            } else if (rand === 3) {
              selectedVariant = 'quaternary';
            }
          });

          return (
            <Styled.SkillBadge
              key={item.id.toString()}
              variant={selectedVariant}
            >
              {item.name.toUpperCase()}
            </Styled.SkillBadge>
          );
        })}
      </Styled.CardTechnology>
      <Styled.CardTitle>
        {title}
      </Styled.CardTitle>
      <Styled.CardDescription>
        {description.slice(0, 100)}
        ...
      </Styled.CardDescription>
    </Styled.Card>
  );
};
