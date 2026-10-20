import authReducer from '../../redux/reducers/auth';
import projectsReducer from '../../redux/reducers/projects';
import { setToken } from '../../redux/actions/auth';
import { projectsState } from '../test-utils';

const init = { type: '@@INIT' };

describe('authReducer', () => {
  it('starts with empty tokens', () => {
    expect(authReducer(undefined, init)).toEqual({ accessToken: '', refreshToken: '' });
  });
  it('stores both tokens on SET_TOKEN', () => {
    expect(authReducer(undefined, setToken('a', 'r'))).toEqual({ accessToken: 'a', refreshToken: 'r' });
  });
});

describe('projectsReducer', () => {
  it('starts empty', () => {
    expect(projectsReducer(undefined, init)).toEqual(projectsState());
  });
  it('stores a page of projects', () => {
    const projects = [{ id: 1, title: 'P', technologies: [], description: 'd', img: '/i.png' }];
    const state = projectsReducer(undefined, {
      type: 'SET_PROJECTS',
      payload: { data: { projects, totalPages: 3, nextPage: 2, previousPage: 0 } },
    });
    expect(state).toMatchObject({ projects, totalPages: 3, nextPage: 2, previousPage: 0 });
  });
  it('stores a single project', () => {
    const project = { id: 4, title: 'X', technologies: [], description: 'd', img: '/i.png' };
    expect(projectsReducer(undefined, { type: 'SET_PROJECT', payload: { data: { project } } }).project).toEqual(project);
  });
  it('toggles loading', () => {
    const once = projectsReducer(undefined, { type: 'SET_LOADING' });
    expect(once.loading).toBe(true);
    expect(projectsReducer(once, { type: 'SET_LOADING' }).loading).toBe(false);
  });
});
