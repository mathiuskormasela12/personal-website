import type { GetServerSidePropsContext } from 'next';
import Services from '../../services';
import { HERO_DEFAULTS } from '../../constants';
import { getHeroServerSideProps } from '../../helpers';

jest.mock('../../services', () => ({
  __esModule: true,
  default: { getHero: jest.fn() },
}));

const context = {} as GetServerSidePropsContext;

const savedHero = {
  titlePrefix: 'Hello,',
  titleHighlight: 'a Mobile Developer',
  titleSuffix: '!',
  subtitle: 'I build apps.',
  buttonText: 'GitHub',
  buttonUrl: 'https://github.com/mathius',
};

it('passes the hero texts from the API to the page', async () => {
  (Services.getHero as jest.Mock).mockResolvedValue({
    data: { results: savedHero },
  });
  await expect(getHeroServerSideProps(context)).resolves.toEqual({
    props: { hero: savedHero },
  });
});

it('falls back to the default texts when the API fails', async () => {
  (Services.getHero as jest.Mock).mockRejectedValue(new Error('timeout'));
  await expect(getHeroServerSideProps(context)).resolves.toEqual({
    props: { hero: HERO_DEFAULTS },
  });
});

it('keeps the texts the home page showed before they became editable', () => {
  expect(HERO_DEFAULTS).toEqual({
    titlePrefix: "Hi, I'm",
    titleHighlight: 'a Fullstack Developer',
    titleSuffix: '.',
    subtitle:
      "I'm Mathius a fullstack developer with 1+ years working experiences.",
    buttonText: 'My Youtube',
    buttonUrl: 'https://www.youtube.com/channel/UC5eUSF2W_vAkYA6wdilJjOw',
  });
});
