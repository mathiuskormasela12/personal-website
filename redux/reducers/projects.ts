// ========== Projects Reducer
// import all modules
import { IProjectsGlobalStates, IProjectsReduxAction } from '../../interfaces';

const initialStates: IProjectsGlobalStates = {
  projects: [],
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
