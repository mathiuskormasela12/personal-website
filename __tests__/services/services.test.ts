import Services from '../../services';

const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPatch = jest.fn();
const mockDelete = jest.fn();

jest.mock('../../services/http', () => ({
  __esModule: true,
  default: () => ({
    get: mockGet,
    post: mockPost,
    patch: mockPatch,
    delete: mockDelete,
  }),
}));

describe('Services', () => {
  it('builds the projects query string', () => {
    Services.getAllProjects({ page: 2, limit: 6 });
    expect(mockGet).toHaveBeenCalledWith('/projects?page=2&limit=6');
  });
  it('reads the hero texts with a request timeout', () => {
    Services.getHero();
    expect(mockGet).toHaveBeenCalledWith('/hero', { timeout: 5000 });
  });
  it('replaces the hero texts', () => {
    const hero = {
      titlePrefix: 'Hello,',
      titleHighlight: 'a Mobile Developer',
      titleSuffix: '!',
      subtitle: 'I build apps.',
      buttonText: 'GitHub',
      buttonUrl: 'https://github.com/mathius',
    };
    Services.updateHero(hero);
    expect(mockPatch).toHaveBeenCalledWith('/hero', hero);
  });
  it('reads the profile', () => {
    Services.getProfile();
    expect(mockGet).toHaveBeenCalledWith('/profile');
  });
  it('replaces the profile', () => {
    const profile = {
      skills: ['React'],
      skillsDescription: 'Hi',
      facebookUrl: '',
      twitterUrl: '',
      youtubeUrl: 'https://www.youtube.com/@mathius',
    };
    Services.updateProfile(profile);
    expect(mockPatch).toHaveBeenCalledWith('/profile', profile);
  });
  it('hits the auth and project endpoints', () => {
    Services.login({ email: 'a@b.c', password: 'x' } as never);
    Services.resetPassword(7, { password: 'p', repeatPassword: 'p' });
    Services.deleteProject(3);
    Services.getDetailProject(5);
    expect(mockPost).toHaveBeenCalledWith('/auth/login', {
      email: 'a@b.c',
      password: 'x',
    });
    expect(mockPatch).toHaveBeenCalledWith('/user/password/7', {
      password: 'p',
      repeatPassword: 'p',
    });
    expect(mockDelete).toHaveBeenCalledWith('/project/3');
    expect(mockGet).toHaveBeenCalledWith('/project/5');
  });
});
