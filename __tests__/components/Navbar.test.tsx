import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { Navbar } from '../../components';
import { PROFILE_DEFAULTS } from '../../constants';
import { setCachedProfile } from '../../hooks/useProfile';
import Services from '../../services';
import {
  emptyProject,
  getMediaRuleStyle,
  projectsState,
  renderWithStore,
} from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: { fire: jest.fn() },
}));
const push = jest.fn();
beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  setCachedProfile(null);
  jest.spyOn(Services, 'getProfile').mockRejectedValue(new Error('offline'));
  push.mockClear();
  (useRouter as jest.Mock).mockReturnValue({
    push,
    pathname: '/',
    asPath: '/',
    query: {},
  });
});

it('shows visitor links, a single brand link and Hire Me', () => {
  const { container } = renderWithStore(<Navbar />);
  expect(screen.getByRole('link', { name: 'Mathius' })).toHaveAttribute(
    'href',
    '/',
  );
  ['Home', 'Projects', 'Skills', 'Contact'].forEach((t) =>
    expect(screen.getByRole('link', { name: t })).toBeInTheDocument(),
  );
  expect(screen.getByRole('button', { name: 'Hire Me' })).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Edit Hero' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Edit Profile' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Admin' }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute(
    'href',
    '#skills',
  );
  expect(container.querySelectorAll('a a')).toHaveLength(0);
  expect(container.querySelectorAll('ul > a')).toHaveLength(0);
});

it('keeps the admin top bar short and puts admin pages in a dropdown', async () => {
  renderWithStore(<Navbar />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
  });
  ['Home', 'Projects', 'Contact'].forEach((name) =>
    expect(screen.getByRole('link', { name })).toBeInTheDocument(),
  );
  ['Create Project', 'Edit Hero', 'Edit Profile', 'Logout'].forEach((name) =>
    expect(screen.queryByRole('link', { name })).not.toBeInTheDocument(),
  );

  await userEvent.click(screen.getByRole('button', { name: 'Admin' }));
  [
    ['Create Project', '/project'],
    ['Edit Hero', '/hero-edit'],
    ['Edit Profile', '/profile-edit'],
    ['Logout', '/logout?from=%2F'],
  ].forEach(([name, href]) =>
    expect(screen.getByRole('link', { name })).toHaveAttribute('href', href),
  );
});

it('highlights Admin while an admin page is open', () => {
  (useRouter as jest.Mock).mockReturnValue({
    push,
    pathname: '/hero-edit',
    query: {},
  });
  renderWithStore(<Navbar />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
  });
  expect(
    screen.getByRole('button', { name: 'Admin' }).closest('li'),
  ).toHaveStyle({ fontWeight: 'bold', color: 'var(--color-dark)' });
  expect(
    screen.getByRole('link', { name: 'Home' }).closest('li'),
  ).not.toHaveStyle({ fontWeight: 'bold' });
});

it('marks the current page in bold, without a colored box', () => {
  renderWithStore(<Navbar />);
  const home = screen.getByRole('link', { name: 'Home' }).closest('li');
  expect(home).toHaveStyle({ fontWeight: 'bold', color: 'var(--color-dark)' });
  expect(home).not.toHaveStyle({ backgroundColor: 'var(--color-shape-color)' });
  expect(
    screen.getByRole('link', { name: 'Projects' }).closest('li'),
  ).toHaveStyle({ color: 'var(--color-light)' });
});

it('groups the links in a soft pill on desktop', () => {
  renderWithStore(<Navbar />);
  const list = screen.getByRole('link', { name: 'Home' }).closest('ul');
  const desktop = getMediaRuleStyle(list as HTMLElement, '(min-width: 1201px)');
  expect(desktop?.getPropertyValue('background-color')).toBe(
    'var(--color-nav-pill)',
  );
  expect(desktop?.getPropertyValue('border-radius')).toBe('999px');
});

it('switches between light and dark from the navbar', async () => {
  document.documentElement.dataset.theme = 'light';
  renderWithStore(<Navbar />);
  await userEvent.click(
    screen.getByRole('button', { name: 'Switch to dark theme' }),
  );
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(
    screen.getByRole('button', { name: 'Switch to light theme' }),
  ).toBeInTheDocument();
});

it('opens and closes the phone menu with a real button', async () => {
  renderWithStore(<Navbar />);
  const menu = screen.getByRole('button', { name: 'Open menu' });
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  expect(menu).toHaveAttribute('type', 'button');
  await userEvent.click(menu);
  const close = screen.getByRole('button', { name: 'Close menu' });
  expect(close).toHaveAttribute('aria-expanded', 'true');
  const list = screen.getByRole('link', { name: 'Home' }).closest('ul');
  expect(close).toHaveAttribute('aria-controls', list?.id);
  await userEvent.click(close);
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

it('opens the edit action for the current project', async () => {
  (Swal.fire as jest.Mock).mockResolvedValue({
    isConfirmed: true,
    isDenied: false,
  });
  renderWithStore(<Navbar />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
    projects: projectsState({ project: { ...emptyProject, id: 5 } }),
  });
  await userEvent.click(screen.getByRole('button', { name: 'Action' }));
  expect(Swal.fire).toHaveBeenCalled();
  await waitFor(() => expect(push).toHaveBeenCalledWith('/project-edit/5'));
});

it('shows the name from the profile as the brand', async () => {
  jest.spyOn(Services, 'getProfile').mockResolvedValue({
    data: { results: { ...PROFILE_DEFAULTS, name: 'Mathius K' } },
  } as never);
  renderWithStore(<Navbar />);
  expect(
    await screen.findByRole('link', { name: 'Mathius K' }),
  ).toHaveAttribute('href', '/');
});

it('remembers the current page in the Logout link, so Stay can return to it', async () => {
  (useRouter as jest.Mock).mockReturnValue({
    push,
    pathname: '/hero-edit',
    asPath: '/hero-edit',
    query: {},
  });
  renderWithStore(<Navbar />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
  });
  await userEvent.click(screen.getByRole('button', { name: 'Admin' }));
  expect(screen.getByRole('link', { name: 'Logout' })).toHaveAttribute(
    'href',
    '/logout?from=%2Fhero-edit',
  );
  expect(screen.getByRole('link', { name: 'Edit Hero' })).toHaveAttribute(
    'href',
    '/hero-edit',
  );
});

it('keeps the phone menu inside a short landscape screen and lets it scroll', async () => {
  renderWithStore(<Navbar />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
  });
  const list = screen.getByRole('link', { name: 'Home' }).closest('ul');
  const phone = getMediaRuleStyle(list as HTMLElement, '(max-width: 1200px)');
  expect(phone?.getPropertyValue('max-height')).toBe('calc(100vh - 4.5rem)');
  expect(phone?.getPropertyValue('overflow-y')).toBe('auto');
  expect(phone?.getPropertyValue('overscroll-behavior')).toBe('contain');
});

it('does not limit the height of the desktop pill', () => {
  renderWithStore(<Navbar />);
  const list = screen.getByRole('link', { name: 'Home' }).closest('ul');
  const desktop = getMediaRuleStyle(list as HTMLElement, '(min-width: 1201px)');
  expect(desktop?.getPropertyValue('max-height')).toBe('');
  expect(desktop?.getPropertyValue('overflow-y')).toBe('');
});

it('spans the whole screen width and keeps its content out of the notch area', () => {
  renderWithStore(<Navbar />);
  const nav = screen.getByRole('navigation');
  const layer = nav.parentElement as HTMLElement;
  expect(layer).toHaveStyle({ left: '0', right: '0' });
  expect(layer).not.toHaveStyle({ width: '100%' });
  expect(nav).toHaveStyle({
    paddingLeft: 'var(--safe-left)',
    paddingRight: 'var(--safe-right)',
  });
});

it('does not size the navbar content by the screen width', () => {
  renderWithStore(<Navbar />);
  const content = screen.getByRole('navigation').firstElementChild as Element;
  const css = Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .map((rule) => rule.cssText)
    .join('');
  expect(content.className).toBeTruthy();
  expect(css).not.toContain('100vw');
});

it('draws the phone menu list, with its top line, from edge to edge', () => {
  renderWithStore(<Navbar />);
  const list = screen.getByRole('link', { name: 'Home' }).closest('ul');
  const phone = getMediaRuleStyle(list as HTMLElement, '(max-width: 1200px)');
  expect(phone?.getPropertyValue('width').replace(/\s/g, '')).toBe(
    'calc(100%+var(--safe-left)+var(--safe-right))',
  );
  expect(phone?.getPropertyValue('margin-left').replace(/\s/g, '')).toBe(
    'calc(-1*var(--safe-left))',
  );
  expect(phone?.getPropertyValue('padding-left')).toBe('var(--safe-left)');
});

const navHeroRules = (): string =>
  Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .flatMap((rule) =>
      rule instanceof CSSMediaRule ? Array.from(rule.cssRules) : [rule],
    )
    .map((rule) => rule.cssText.replace(/\s/g, ''))
    .join('\n');

describe('the dark layer behind the open phone menu', () => {
  const openMenu = async () => {
    renderWithStore(<Navbar />);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const hero = screen.getByRole('navigation').parentElement as HTMLElement;
    return hero.classList[hero.classList.length - 1];
  };

  it('is not the background of the fixed box that holds the menu', async () => {
    const name = await openMenu();
    const own = navHeroRules()
      .split('\n')
      .filter((rule) => rule.startsWith(`.${name}{`));
    expect(own.join('')).toContain('position:fixed');
    expect(own.join('')).not.toContain('background');
  });

  it('is a separate layer that ignores taps and covers the whole screen', async () => {
    const name = await openMenu();
    const layer = navHeroRules()
      .split('\n')
      .find((rule) => rule.startsWith(`.${name}::before{`));
    expect(layer).toContain('background:rgba(0,0,0,0.5)');
    expect(layer).toContain('pointer-events:none');
    expect(layer).toContain('position:fixed');
    expect(layer).toMatch(/top:0;/);
    expect(layer).toMatch(/bottom:0;/);
    expect(layer).toContain('left:var(--safe-left);');
    expect(layer).toContain('right:var(--safe-right);');
  });

  it('is not drawn when the menu is closed', () => {
    renderWithStore(<Navbar />);
    const hero = screen.getByRole('navigation').parentElement as HTMLElement;
    const name = hero.classList[hero.classList.length - 1];
    expect(navHeroRules()).not.toContain(`.${name}::before{`);
  });
});

describe('the edge bars that set the strip color in Chrome on iPhone', () => {
  const bars = () =>
    Array.from(document.querySelectorAll('[data-edge-bar]')) as HTMLElement[];
  const rulesFor = (element: Element): string[] =>
    Array.from(document.styleSheets)
      .flatMap((sheet) => Array.from(sheet.cssRules))
      .flatMap((rule) =>
        rule instanceof CSSMediaRule
          ? Array.from(rule.cssRules).map(
              (inner) =>
                `@${rule.media.mediaText.replace(/\s/g, '')}{${inner.cssText.replace(/\s/g, '')}}`,
            )
          : [rule.cssText.replace(/\s/g, '')],
      )
      .filter((rule) =>
        Array.from(element.classList).some((name) =>
          rule.replace(/^@[^{]*\{/, '').startsWith(`.${name}{`),
        ),
      );

  it('draws one bar on the left edge and one on the right edge', () => {
    renderWithStore(<Navbar />);
    expect(bars().map((bar) => bar.getAttribute('data-edge-bar'))).toEqual([
      'left',
      'right',
    ]);
  });

  it('keeps each bar fixed to its screen edge, 2px wide, above the menu', () => {
    renderWithStore(<Navbar />);
    const [left, right] = bars();
    const leftRule = rulesFor(left).join('');
    const rightRule = rulesFor(right).join('');
    expect(leftRule).toContain('position:fixed;');
    expect(leftRule).toContain('left:0;');
    expect(leftRule).toContain('top:0;');
    expect(leftRule).toContain('bottom:0;');
    expect(leftRule).toContain('width:2px;');
    expect(leftRule).toContain('z-index:4;');
    expect(rightRule).toContain('right:0;');
    expect(rightRule).not.toContain('left:0;');
  });

  it('shows the bars only on phones and tablets held sideways', () => {
    renderWithStore(<Navbar />);
    const [left] = bars();
    const rules = rulesFor(left);
    expect(rules.find((rule) => rule.startsWith('.'))).toContain(
      'display:none;',
    );
    expect(
      rules.find((rule) =>
        rule.startsWith('@(max-width:1200px)and(orientation:landscape){'),
      ),
    ).toContain('display:block;');
  });

  it('uses the page color when the menu is closed and the dimmed color when it is open', async () => {
    renderWithStore(<Navbar />);
    const landscape = (element: Element) =>
      rulesFor(element)
        .filter((rule) =>
          rule.startsWith('@(max-width:1200px)and(orientation:landscape){'),
        )
        .join('');
    expect(landscape(bars()[0])).toContain(
      'background:var(--color-background);',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(landscape(bars()[0])).toContain('background:var(--color-dimmed);');
    expect(landscape(bars()[1])).toContain('background:var(--color-dimmed);');
    await userEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(landscape(bars()[0])).toContain(
      'background:var(--color-background);',
    );
  });

  it('lets the bars be tapped like the test page did, and keeps them out of the accessibility tree', () => {
    renderWithStore(<Navbar />);
    expect(bars()).toHaveLength(2);
    bars().forEach((bar) => {
      expect(rulesFor(bar).join('')).not.toContain('pointer-events:none');
      expect(bar).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('does not change the body color while the menu is open any more', async () => {
    renderWithStore(<Navbar />);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(document.documentElement).not.toHaveAttribute('data-menu-open');
  });
});
