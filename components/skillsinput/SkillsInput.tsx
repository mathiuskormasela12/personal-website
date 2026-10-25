import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { getSkillInitials, getSkillLogo, validateSkills } from '../../helpers';
import { ISkillsInputProps } from '../../interfaces';
import { Button } from '../button/Button';
import { ErrorMessage, Input } from '../textfield/textfield.styled';
import * as Styled from './skillsinput.styled';

const MAX_SKILLS = 24;

export const SkillsInput: React.FC<ISkillsInputProps> = ({
  id,
  skills,
  onChange,
  invalidMessage,
}) => {
  const [draft, setDraft] = useState('');
  const [addError, setAddError] = useState('');

  const addSkill = () => {
    const name = draft.trim();

    if (name === '') {
      return;
    }

    const error = validateSkills([...skills, name]);

    if (error) {
      setAddError(error);
      return;
    }

    onChange([...skills, name]);
    setDraft('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addSkill();
    }
  };

  const errorMessage = addError || invalidMessage;

  return (
    <div>
      <Styled.Pills>
        {skills.map((name) => {
          const logo = getSkillLogo(name);

          return (
            <Styled.Pill key={name}>
              <Styled.PillLogo aria-hidden>
                {logo ? (
                  <logo.Icon
                    size={Math.round(14 * logo.scale)}
                    color={logo.color}
                  />
                ) : (
                  getSkillInitials(name)
                )}
              </Styled.PillLogo>
              {name}
              <Styled.RemoveButton
                type="button"
                aria-label={`Remove ${name}`}
                onClick={() =>
                  onChange(skills.filter((skill) => skill !== name))
                }
              >
                <FiX size={12} aria-hidden />
              </Styled.RemoveButton>
            </Styled.Pill>
          );
        })}
      </Styled.Pills>
      <Styled.Row>
        <Input
          id={id}
          value={draft}
          placeholder="Add a skill, e.g. Docker"
          invalidMessage={errorMessage}
          onChange={(event) => {
            setDraft(event.target.value);
            setAddError('');
          }}
          onKeyDown={handleKeyDown}
        />
        <Button type="button" size="md" onClick={addSkill}>
          Add
        </Button>
      </Styled.Row>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Styled.Hint>
        Logos are added automatically for known names. Others show their first
        two letters.
      </Styled.Hint>
      <Styled.Hint>
        {skills.length} / {MAX_SKILLS}
      </Styled.Hint>
    </div>
  );
};
