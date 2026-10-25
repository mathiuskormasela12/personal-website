// ========== Card
// import all modules
import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { ICardProps } from '../../interfaces';
import * as Styled from './card.styled';

export const Card: React.FC<ICardProps> = (props) => {
  const { title, description, technologies, img, onClick } = props;

  return (
    <Styled.Card onClick={onClick}>
      <Styled.Image
        src={img}
        alt={title}
        sizes="(min-width: 1201px) 33vw, (min-width: 600px) 50vw, 100vw"
        width={370}
        height={220}
        quality={75}
      />
      <Styled.Tags>
        {technologies.map((item) => (
          <Styled.Tag key={item.id.toString()}>{item.name}</Styled.Tag>
        ))}
      </Styled.Tags>
      <Styled.CardTitle>{title}</Styled.CardTitle>
      <Styled.CardDescription>{description}</Styled.CardDescription>
      <Styled.Arrow data-arrow aria-hidden>
        <FiArrowUpRight size={16} />
      </Styled.Arrow>
    </Styled.Card>
  );
};
