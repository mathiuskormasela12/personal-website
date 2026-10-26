import React from 'react';
import { IconType } from 'react-icons';
import { SiFacebook, SiX, SiYoutube } from 'react-icons/si';
import { ISocialLinksProps } from '../../interfaces';
import * as Styled from './sociallinks.styled';

const SOCIAL_ICONS: {
  field: keyof ISocialLinksProps['links'];
  name: string;
  Icon: IconType;
}[] = [
  { field: 'facebookUrl', name: 'Facebook', Icon: SiFacebook },
  { field: 'twitterUrl', name: 'Twitter', Icon: SiX },
  { field: 'youtubeUrl', name: 'Youtube', Icon: SiYoutube },
];

export const SocialLinks: React.FC<ISocialLinksProps> = ({ links }) => {
  const visible = SOCIAL_ICONS.filter(
    ({ field }) => links[field].trim() !== '',
  );

  if (visible.length === 0) {
    return null;
  }

  return (
    <Styled.List>
      {visible.map(({ field, name, Icon }) => (
        <li key={field}>
          <Styled.Link
            href={links[field].trim()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
          >
            <Icon size={16} aria-hidden />
          </Styled.Link>
        </li>
      ))}
    </Styled.List>
  );
};
