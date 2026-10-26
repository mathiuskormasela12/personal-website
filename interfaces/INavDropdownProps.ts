import { IconType } from 'react-icons';

export interface INavDropdownItem {
  id: number;
  text: string;
  path: string;
  icon: IconType;
  danger?: boolean;
}

export interface INavDropdownProps {
  label: string;
  items: INavDropdownItem[];
}
