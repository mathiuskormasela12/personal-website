// ========== Projects Actions
// import all modules
import { IGetProjectsQueries } from '../../interfaces';
import Services from '../../services';
import { SetProjectFunc, SetProjectsFunc } from '../../types';

export const setProjects: SetProjectsFunc = (page: number) => async (dispatch: any) => {
  dispatch({
    type: 'SET_LOADING',
  });

  const queries: IGetProjectsQueries = {
    page,
    limit: 6,
  };

  try {
    const { data } = await Services.getAllProjects(queries);
    dispatch({
      type: 'SET_PROJECTS',
      payload: {
        data: {
          projects: data.results,
          totalPages: data.pageInfo.totalPages,
          nextPage: data.pageInfo.nextLink ? page + 1 : 0,
          previousPage: data.pageInfo.previousLink ? page - 1 : 0,
        },
      },
    });
    dispatch({
      type: 'SET_LOADING',
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    dispatch({
      type: 'SET_PROJECTS',
      payload: {
        data: {
          projects: [],
          totalPages: 0,
          nextPage: 0,
        },
      },
    });
    dispatch({
      type: 'SET_LOADING',
    });
  }
};

export const setProject: SetProjectFunc = (id: number) => async (dispatch: any) => {
  dispatch({
    type: 'SET_LOADING',
  });

  try {
    const { data } = await Services.getDetailProject(id);
    dispatch({
      type: 'SET_PROJECT',
      payload: {
        data: {
          project: data.results,
        },
      },
    });
    dispatch({
      type: 'SET_LOADING',
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    dispatch({
      type: 'SET_PROJECT',
      payload: {
        data: {
          project: {
            id: 0,
            title: '',
            technologies: [],
            description: '',
            img: '',
          },
        },
      },
    });
    dispatch({
      type: 'SET_LOADING',
    });
  }
};
