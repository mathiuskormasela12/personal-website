import React from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';
import { formatPhone } from '../../helpers';
import { IContactLinksProps } from '../../interfaces';
import { CountryFlag } from '../countryflag/CountryFlag';
import * as Styled from './contactlinks.styled';

export const ContactLinks: React.FC<IContactLinksProps> = ({ contacts }) => {
  const email = contacts.email.trim();
  const phone = formatPhone(contacts.phone);

  if (email === '' && !phone) {
    return null;
  }

  return (
    <Styled.List>
      {email !== '' && (
        <li>
          <Styled.Link href={`mailto:${email}`}>
            <FiMail aria-hidden />
            {email}
          </Styled.Link>
        </li>
      )}
      {phone && (
        <li>
          <Styled.Link href={`tel:${contacts.phone.trim()}`}>
            <FiPhone aria-hidden />
            {phone.country && <CountryFlag country={phone.country} />}
            {phone.text}
          </Styled.Link>
        </li>
      )}
    </Styled.List>
  );
};
