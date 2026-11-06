import React, { useEffect, useRef } from 'react';
import { FiCheck, FiPlus, FiTrash2 } from 'react-icons/fi';
import { MAX_POINT_LENGTH, MAX_POINTS } from '../../helpers';
import { IDescriptionInputProps } from '../../interfaces';
import { ErrorMessage, Input } from '../textfield/textfield.styled';
import * as Styled from './descriptioninput.styled';

const getPointId = (id: string, index: number) =>
  index === 0 ? id : `${id}-${index}`;

export const DescriptionInput: React.FC<IDescriptionInputProps> = ({
  id,
  points,
  onChange,
  pointErrors = [],
  invalidMessage,
}) => {
  const focusIndex = useRef<number | null>(null);

  useEffect(() => {
    if (focusIndex.current !== null) {
      document.getElementById(getPointId(id, focusIndex.current))?.focus();
      focusIndex.current = null;
    }
  }, [id, points.length]);

  const changePoint = (index: number, value: string) =>
    onChange(points.map((point, i) => (i === index ? value : point)));

  const removePoint = (index: number) =>
    onChange(points.filter((_, i) => i !== index));

  const addPoint = () => {
    focusIndex.current = points.length;
    onChange([...points, '']);
  };

  return (
    <div>
      <Styled.Points>
        {points.map((point, index) => {
          const error = pointErrors[index];
          const number = index + 1;

          return (
            <Styled.Point key={index}>
              <FiCheck size={17} strokeWidth={2.5} aria-hidden />
              <Input
                id={getPointId(id, index)}
                aria-label={index === 0 ? undefined : `Point ${number}`}
                value={point}
                placeholder="What did you do?"
                invalidMessage={error}
                aria-invalid={error ? true : undefined}
                onChange={(event) => changePoint(index, event.target.value)}
              />
              <Styled.RemoveButton
                type="button"
                aria-label={`Remove point ${number}`}
                disabled={points.length === 1}
                onClick={() => removePoint(index)}
              >
                <FiTrash2 size={15} aria-hidden />
              </Styled.RemoveButton>
              {error && <Styled.PointError>{error}</Styled.PointError>}
            </Styled.Point>
          );
        })}
      </Styled.Points>
      <Styled.AddButton
        type="button"
        disabled={points.length >= MAX_POINTS}
        onClick={addPoint}
      >
        <FiPlus size={16} aria-hidden />
        Add point
      </Styled.AddButton>
      {invalidMessage && <ErrorMessage>{invalidMessage}</ErrorMessage>}
      <Styled.Meta>
        <span>
          Each point shows with a check mark. Max {MAX_POINT_LENGTH} characters
          each.
        </span>
        <span>
          {points.length} / {MAX_POINTS}
        </span>
      </Styled.Meta>
    </div>
  );
};
