// ========== IGlobalStates
// import all modules
import { IProjects } from './IProjects';

export interface IGlobalStates {
	auth: {
		accessToken: string;
		refreshToken: string
	},
	projects: {
		projects: IProjects[];
		project: IProjects;
		loading: boolean;
		currentPage: number;
		previousPage: number;
		nextPage: number;
		totalPages: number;
	},
}
