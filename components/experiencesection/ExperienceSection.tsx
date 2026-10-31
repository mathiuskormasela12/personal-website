import React, { useId, useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import {
  formatMonth,
  formatMonthCount,
  getDuration,
  getExperienceTotal,
  groupByCompany,
} from '../../helpers';
import { IExperience, IExperienceSectionProps } from '../../interfaces';
import { Colors } from '../../themes';
import * as Styled from './experiencesection.styled';

const NEXT_KEYS = ['ArrowDown', 'ArrowRight'];

const PREVIOUS_KEYS = ['ArrowUp', 'ArrowLeft'];

const getDates = ({ startDate, endDate }: IExperience) =>
  `${formatMonth(startDate)} – ${endDate ? formatMonth(endDate) : 'Present'} · ${getDuration(startDate, endDate)}`;

const getTotalText = (companies: number) =>
  ` of building web & mobile apps, across ${companies} ${companies === 1 ? 'company' : 'companies'}.`;

const getNextIndex = (key: string, index: number, count: number) => {
  if (NEXT_KEYS.includes(key)) {
    return (index + 1) % count;
  }

  if (PREVIOUS_KEYS.includes(key)) {
    return (index - 1 + count) % count;
  }

  if (key === 'Home') {
    return 0;
  }

  if (key === 'End') {
    return count - 1;
  }

  return null;
};

export const ExperienceSection: React.FC<IExperienceSectionProps> = ({
  experiences,
  preview = false,
  editingId = null,
}) => {
  const baseId = useId();
  const headingId = `${baseId}-heading`;
  const groups = groupByCompany(experiences);
  const total = getExperienceTotal(experiences);
  const editingIndex = groups.findIndex(({ roles }) =>
    roles.some(({ id }) => id === editingId),
  );
  const [selected, setSelected] = useState(Math.max(editingIndex, 0));
  const [followedIndex, setFollowedIndex] = useState(editingIndex);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = Math.min(selected, Math.max(groups.length - 1, 0));
  const group = groups[active];

  if (followedIndex !== editingIndex) {
    setFollowedIndex(editingIndex);

    if (editingIndex >= 0) {
      setSelected(editingIndex);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const next = getNextIndex(event.key, active, groups.length);

    if (next === null) {
      return;
    }

    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Styled.Section aria-labelledby={headingId} $preview={preview}>
      <Styled.Heading id={headingId} $preview={preview}>
        Experience<Styled.Dot aria-hidden>.</Styled.Dot>
      </Styled.Heading>
      {total.months > 0 && (
        <Styled.Total $preview={preview}>
          <Styled.TotalValue>
            {formatMonthCount(total.months, 'long')}
          </Styled.TotalValue>
          {getTotalText(total.companies)}
        </Styled.Total>
      )}
      {group && (
        <Styled.Body $preview={preview}>
          <Styled.TabsWrap
            $preview={preview}
            $fade={preview ? Colors.surface : Colors.background}
          >
            <Styled.Tabs
              role="tablist"
              aria-label="Companies"
              $preview={preview}
            >
              {groups.map(({ company, roles }, index) => (
                <Styled.Tab
                  key={roles[0].id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${index}`}
                  aria-selected={index === active}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={index === active ? 0 : -1}
                  $active={index === active}
                  $preview={preview}
                  onClick={() => setSelected(index)}
                  onKeyDown={handleKeyDown}
                >
                  {company}
                </Styled.Tab>
              ))}
            </Styled.Tabs>
          </Styled.TabsWrap>
          <Styled.Panel
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${active}`}
            $preview={preview}
          >
            {group.roles.map((experience) => (
              <Styled.Role key={experience.id} $preview={preview}>
                <Styled.Title $preview={preview}>
                  {experience.role} <Styled.At>@ {group.company}</Styled.At>
                </Styled.Title>
                <Styled.Dates>{getDates(experience)}</Styled.Dates>
                <Styled.Points $preview={preview}>
                  {experience.description.map((point, index) => (
                    <Styled.Point key={`${index}-${point}`} $preview={preview}>
                      <FiCheck size={18} strokeWidth={2.5} aria-hidden />
                      <span>{point}</span>
                    </Styled.Point>
                  ))}
                </Styled.Points>
              </Styled.Role>
            ))}
          </Styled.Panel>
        </Styled.Body>
      )}
    </Styled.Section>
  );
};
