// ========== IProjectsGlobalStates
// import all modules
import { IProjects } from './IProjects';

export interface IProjectsGlobalStates {
	projects: IProjects[];
	project: IProjects;
	loading: boolean;
	previousPage: number;
	nextPage: number;
	totalPages: number;
}
