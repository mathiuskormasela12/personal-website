import Services from '../../services';

const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPatch = jest.fn();
const mockDelete = jest.fn();

jest.mock('../../services/http', () => ({
  __esModule: true,
  default: () => ({ get: mockGet, post: mockPost, patch: mockPatch, delete: mockDelete }),
}));

describe('Services', () => {
  it('builds the projects query string', () => {
    Services.getAllProjects({ page: 2, limit: 6 });
    expect(mockGet).toHaveBeenCalledWith('/projects?page=2&limit=6');
  });
  it('hits the auth and project endpoints', () => {
    Services.login({ email: 'a@b.c', password: 'x' } as never);
    Services.resetPassword(7, { password: 'p', repeatPassword: 'p' });
    Services.deleteProject(3);
    Services.getDetailProject(5);
    expect(mockPost).toHaveBeenCalledWith('/auth/login', { email: 'a@b.c', password: 'x' });
    expect(mockPatch).toHaveBeenCalledWith('/user/password/7', { password: 'p', repeatPassword: 'p' });
    expect(mockDelete).toHaveBeenCalledWith('/project/3');
    expect(mockGet).toHaveBeenCalledWith('/project/5');
  });
});
