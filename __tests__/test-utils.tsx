import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { StyleSheetManager } from 'styled-components';
import authReducer from '../redux/reducers/auth';
import projectsReducer from '../redux/reducers/projects';
import { shouldForwardProp } from '../styles/shouldForwardProp';
import {
  IAuthGlobalStates,
  IProjects,
  IProjectsGlobalStates,
} from '../interfaces';

export const emptyProject: IProjects = {
  id: 0,
  title: '',
  technologies: [],
  description: '',
  img: '',
};

export const projectsState = (
  overrides: Partial<IProjectsGlobalStates> = {},
): IProjectsGlobalStates => ({
  projects: [],
  project: emptyProject,
  loading: false,
  previousPage: 0,
  nextPage: 0,
  totalPages: 0,
  ...overrides,
});

type TestState = { auth?: IAuthGlobalStates; projects?: IProjectsGlobalStates };

export const makeStore = (preloadedState: TestState = {}) =>
  configureStore({
    reducer: { auth: authReducer, projects: projectsReducer },
    preloadedState: {
      auth: preloadedState.auth ?? { accessToken: '', refreshToken: '' },
      projects: preloadedState.projects ?? projectsState(),
    },
  });

export const renderWithStore = (
  ui: React.ReactElement,
  preloadedState: TestState = {},
) => {
  const store = makeStore(preloadedState);
  return {
    store,
    ...render(
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <Provider store={store}>{ui}</Provider>
      </StyleSheetManager>,
    ),
  };
};
