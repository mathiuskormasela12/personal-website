import React, { Fragment } from 'react';
import { IProjectContentProps } from '../../interfaces';
import * as Styled from '../../styles/detail.styled';
import * as CardStyled from '../card/card.styled';

export const ProjectContent: React.FC<IProjectContentProps> = ({
  title,
  description,
  img,
  technologies,
  preview = false,
}) => (
  <Fragment>
    <Styled.HeroDetailTitle as={preview ? 'h2' : 'h1'}>
      {title}
    </Styled.HeroDetailTitle>
    {img ? (
      <Styled.HeroDetailImage
        src={img}
        alt={title}
        width={550}
        height={320}
        sizes="(min-width: 800px) 768px, 100vw"
      />
    ) : (
      <Styled.HeroDetailEmptyImage data-testid="project-picture-empty" />
    )}
    {technologies.length > 0 && (
      <CardStyled.Tags>
        {technologies.map((name, index) => (
          <CardStyled.Tag key={`${name}-${index}`}>{name}</CardStyled.Tag>
        ))}
      </CardStyled.Tags>
    )}
    <Styled.HeroDetailText>{description}</Styled.HeroDetailText>
  </Fragment>
);
