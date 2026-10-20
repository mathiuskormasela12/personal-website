// ========== Projects Reducer
// import all modules
import type { UnknownAction } from '@reduxjs/toolkit';
import { IProjectsGlobalStates, IProjectsReduxAction } from '../../interfaces';

const initialStates: IProjectsGlobalStates = {
  projects: [],
  project: {
    id: 0,
    title: '',
    technologies: [],
    description: '',
    img: '',
  },
  loading: false,
  previousPage: 0,
  nextPage: 0,
  totalPages: 0,
};

const projectsReducer = (
  states: IProjectsGlobalStates = initialStates,
  action: UnknownAction,
): IProjectsGlobalStates => {
  switch (action.type) {
    case 'SET_PROJECTS': {
      const { data } = (action as IProjectsReduxAction).payload;
      return {
        ...states,
        projects: data.projects,
        totalPages: data.totalPages,
        previousPage: data.previousPage,
        nextPage: data.nextPage,
      };
    }

    case 'SET_PROJECT': {
      return {
        ...states,
        project: (action as IProjectsReduxAction).payload.data.project,
      };
    }

    case 'SET_LOADING': {
      return {
        ...states,
        loading: !states.loading,
      };
    }

    default: {
      return {
        ...states,
      };
    }
  }
};

export default projectsReducer;
