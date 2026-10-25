import { IProfile } from './IProfile';

export interface ISocialLinksProps {
  links: Pick<IProfile, 'facebookUrl' | 'twitterUrl' | 'youtubeUrl'>;
}
