// ========== Projects Reducer
// import all modules
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
  action: IProjectsReduxAction,
): IProjectsGlobalStates => {
  switch (action.type) {
    case 'SET_PROJECTS': {
      return {
        ...states,
        projects: action.payload.data.projects,
        totalPages: action.payload.data.totalPages,
        previousPage: action.payload.data.previousPage,
        nextPage: action.payload.data.nextPage,
      };
    }

    case 'SET_PROJECT': {
      return {
        ...states,
        project: action.payload.data.project,
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
