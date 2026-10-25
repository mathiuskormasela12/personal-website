import React, { useId } from 'react';
import { ISkillsSectionProps } from '../../interfaces';
import { SkillTile } from '../skilltile/SkillTile';
import * as Styled from './skillssection.styled';

const COLUMN_COUNT = 4;

const toColumns = (skills: string[]) =>
  Array.from({ length: COLUMN_COUNT }, (_, column) =>
    skills.filter((_, index) => index % COLUMN_COUNT === column),
  ).filter((column) => column.length > 0);

export const SkillsSection: React.FC<ISkillsSectionProps> = ({
  skills,
  description,
  preview = false,
}) => {
  const headingId = useId();

  return (
    <Styled.Section aria-labelledby={headingId} $preview={preview}>
      <Styled.Text $preview={preview}>
        <Styled.Heading id={headingId} $preview={preview}>
          What I build with
        </Styled.Heading>
        <Styled.Description>{description}</Styled.Description>
      </Styled.Text>
      <Styled.Panel $preview={preview}>
        <Styled.Columns>
          {toColumns(skills).map((column) => (
            <Styled.Column key={column[0]}>
              {column.map((name) => (
                <SkillTile key={name} name={name} />
              ))}
            </Styled.Column>
          ))}
        </Styled.Columns>
      </Styled.Panel>
    </Styled.Section>
  );
};
