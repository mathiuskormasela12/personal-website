// ========== Projects Redux Action
// import all modules
import { IProjects } from './IProjects';

export interface IProjectsReduxAction {
	type: 'SET_PROJECTS' | 'SET_LOADING' | 'SET_PROJECT',
	payload: {
		data: {
			projects: IProjects[];
			project: IProjects;
			totalPages: number;
			previousPage: number;
			nextPage: number;
		}
	}
}
