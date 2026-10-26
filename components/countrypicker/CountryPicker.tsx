import React, { useEffect, useId, useRef, useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from 'libphonenumber-js/min';
import { useDismiss } from '../../hooks/useDismiss';
import { ICountryPickerProps } from '../../interfaces';
import { CountryFlag } from '../countryflag/CountryFlag';
import * as Styled from './countrypicker.styled';

type CountryOption = {
  code: CountryCode;
  name: string;
  dialCode: string;
};

let countryOptions: CountryOption[] | null = null;

const getCountryOptions = (): CountryOption[] => {
  if (!countryOptions) {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    countryOptions = getCountries()
      .map((code) => ({
        code,
        name: regionNames.of(code) ?? code,
        dialCode: `+${getCountryCallingCode(code)}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  return countryOptions;
};

const matchesQuery = (option: CountryOption, query: string): boolean => {
  const value = query.trim().toLowerCase();
  const digits = value.replace(/^\+/, '');

  if (value === '') {
    return true;
  }

  if (/^\d+$/.test(digits)) {
    return option.dialCode.slice(1).startsWith(digits);
  }

  return (
    option.code.toLowerCase() === value ||
    option.name.toLowerCase().includes(value)
  );
};

export const CountryPicker: React.FC<ICountryPickerProps> = ({
  country,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useDismiss({
    isOpen,
    onDismiss: () => setIsOpen(false),
    rootRef,
    triggerRef,
  });

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    }
  }, [isOpen]);

  const options = getCountryOptions();
  const selected = options.find((option) => option.code === country);
  const matches = options.filter((option) => matchesQuery(option, query));

  const toggle = () => {
    setQuery('');
    setIsOpen((current) => !current);
  };

  const choose = (code: CountryCode) => {
    onChange(code);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const focusOption = (index: number) => {
    if (index < 0) {
      searchRef.current?.focus();
      return;
    }

    const items =
      listRef.current?.querySelectorAll<HTMLElement>('[role="option"]');
    items?.[Math.min(index, items.length - 1)]?.focus();
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusOption(0);
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent,
    index: number,
    code: CountryCode,
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusOption(index + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusOption(index - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose(code);
    }
  };

  return (
    <Styled.Root ref={rootRef}>
      <Styled.Trigger
        ref={triggerRef}
        type="button"
        $open={isOpen}
        aria-label={`Country: ${selected?.name ?? country} ${selected?.dialCode ?? ''}`.trim()}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        onClick={toggle}
      >
        <CountryFlag country={country} />
        {selected?.dialCode}
        <FiChevronDown size={13} aria-hidden />
      </Styled.Trigger>
      {isOpen && (
        <Styled.Popover>
          <Styled.Search>
            <FiSearch size={14} aria-hidden />
            <Styled.SearchInput
              ref={searchRef}
              type="search"
              aria-label="Search country"
              placeholder="Search country..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </Styled.Search>
          <Styled.List
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Countries"
          >
            {matches.map(({ code, name, dialCode }, index) => (
              <Styled.Option
                key={code}
                role="option"
                tabIndex={-1}
                aria-selected={code === country}
                $selected={code === country}
                onClick={() => choose(code)}
                onKeyDown={(event) => handleOptionKeyDown(event, index, code)}
              >
                <CountryFlag country={code} />
                <Styled.Name>{name}</Styled.Name>
                <Styled.DialCode>{dialCode}</Styled.DialCode>
              </Styled.Option>
            ))}
          </Styled.List>
          {matches.length === 0 && (
            <Styled.Empty>No country found</Styled.Empty>
          )}
        </Styled.Popover>
      )}
    </Styled.Root>
  );
};
