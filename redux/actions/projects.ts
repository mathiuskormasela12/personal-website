// ========== Projects Actions
// import all modules
import { IProjects } from '../../interfaces';
import { SetProjectsFunc } from '../../types';

export const setProjects: SetProjectsFunc = (data: IProjects[]) => ({
  type: 'SET_PROJECTS',
  payload: {
    data: {
      projects: data,
    },
  },
});
