import { IProfile } from './IProfile';

export interface IContactLinksProps {
  contacts: Pick<IProfile, 'email' | 'phone'>;
}
