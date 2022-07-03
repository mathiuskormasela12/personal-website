// ========== Projects Redux Action
// import all modules
import { IProjects } from './IProjects';

export interface IProjectsReduxAction {
	type: 'SET_PROJECTS',
	payload: {
		data: {
			projects: IProjects[];
		}
	}
}
