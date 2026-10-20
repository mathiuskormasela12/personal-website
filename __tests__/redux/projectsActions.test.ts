import Services from '../../services';
import { setProject, setProjects } from '../../redux/actions/projects';

jest.mock('../../services', () => ({
  __esModule: true,
  default: { getAllProjects: jest.fn(), getDetailProject: jest.fn() },
}));

const dispatch = jest.fn();
const types = () => dispatch.mock.calls.map(([action]) => action.type);

beforeEach(() => {
  dispatch.mockClear();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

describe('setProjects', () => {
  it('loads a page and derives next/previous page numbers', async () => {
    (Services.getAllProjects as jest.Mock).mockResolvedValue({
      data: {
        results: [{ id: 1 }],
        pageInfo: { totalPages: 3, nextLink: 'n', previousLink: 'p' },
      },
    });
    await setProjects(2)(dispatch);
    expect(Services.getAllProjects).toHaveBeenCalledWith({ page: 2, limit: 6 });
    expect(types()).toEqual(['SET_LOADING', 'SET_PROJECTS', 'SET_LOADING']);
    expect(dispatch.mock.calls[1][0].payload.data).toEqual({
      projects: [{ id: 1 }],
      totalPages: 3,
      nextPage: 3,
      previousPage: 1,
    });
  });

  it('falls back to an empty list when the API fails', async () => {
    (Services.getAllProjects as jest.Mock).mockRejectedValue(new Error('down'));
    await setProjects(1)(dispatch);
    expect(types()).toEqual(['SET_LOADING', 'SET_PROJECTS', 'SET_LOADING']);
    expect(dispatch.mock.calls[1][0].payload.data).toEqual({
      projects: [],
      totalPages: 0,
      nextPage: 0,
    });
  });
});

describe('setProject', () => {
  it('stores the fetched project', async () => {
    (Services.getDetailProject as jest.Mock).mockResolvedValue({
      data: { results: { id: 4, title: 'X' } },
    });
    await setProject(4)(dispatch);
    expect(Services.getDetailProject).toHaveBeenCalledWith(4);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'SET_PROJECT',
      payload: { data: { project: { id: 4, title: 'X' } } },
    });
  });

  it('resets to an empty project when the API fails', async () => {
    (Services.getDetailProject as jest.Mock).mockRejectedValue(
      new Error('down'),
    );
    await setProject(4)(dispatch);
    expect(types()).toEqual(['SET_LOADING', 'SET_PROJECT', 'SET_LOADING']);
    expect(dispatch.mock.calls[1][0].payload.data.project).toMatchObject({
      id: 0,
      title: '',
    });
  });
});
