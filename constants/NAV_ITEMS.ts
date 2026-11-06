// ========== NAV ITEMS
import {
  FiBriefcase,
  FiEdit3,
  FiLogOut,
  FiPlusSquare,
  FiUser,
} from 'react-icons/fi';
import { INavDropdownItem } from '../interfaces';

export const NAV_ITEMS = {
  USER: [
    {
      id: 1,
      text: 'Home',
      path: '/',
    },
    {
      id: 2,
      text: 'Projects',
      path: '#projects',
    },
    {
      id: 3,
      text: 'Skills',
      path: '#skills',
    },
    {
      id: 4,
      text: 'Experience',
      path: '#experience',
    },
    {
      id: 5,
      text: 'Contact',
      path: '#footer',
    },
  ],
  ADMIN: [
    {
      id: 1,
      text: 'Home',
      path: '/',
    },
    {
      id: 2,
      text: 'Projects',
      path: '#projects',
    },
    {
      id: 3,
      text: 'Experience',
      path: '#experience',
    },
    {
      id: 4,
      text: 'Contact',
      path: '#footer',
    },
  ],
  ADMIN_MENU: [
    {
      id: 1,
      text: 'Create Project',
      path: '/project',
      icon: FiPlusSquare,
    },
    {
      id: 2,
      text: 'Edit Hero',
      path: '/hero-edit',
      icon: FiEdit3,
    },
    {
      id: 3,
      text: 'Edit Profile',
      path: '/profile-edit',
      icon: FiUser,
    },
    {
      id: 4,
      text: 'Edit Experience',
      path: '/experience-edit',
      icon: FiBriefcase,
    },
    {
      id: 5,
      text: 'Logout',
      path: '/logout',
      icon: FiLogOut,
      danger: true,
    },
  ] satisfies INavDropdownItem[],
};
