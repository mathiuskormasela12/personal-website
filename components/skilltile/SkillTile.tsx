import React from 'react';
import { getSkillInitials, getSkillLogo } from '../../helpers';
import { ISkillTileProps } from '../../interfaces';
import * as Styled from './skilltile.styled';

export const SkillTile: React.FC<ISkillTileProps> = ({ name }) => {
  const logo = getSkillLogo(name);

  return (
    <Styled.Item>
      <Styled.Tile>
        {logo ? (
          <logo.Icon
            size={`${Math.round(45 * logo.scale)}%`}
            color={logo.color}
            aria-hidden
          />
        ) : (
          <Styled.Initials aria-hidden>
            {getSkillInitials(name)}
          </Styled.Initials>
        )}
      </Styled.Tile>
      <Styled.Caption>{name}</Styled.Caption>
    </Styled.Item>
  );
};
