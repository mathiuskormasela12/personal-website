// ========== IGlobalStates
// import all modules
import { IProjects } from './IProjects';

export interface IGlobalStates {
	auth: {
		accessToken: string;
		refreshToken: string
	},
	authTemporary: {
		accessToken: string;
		refreshToken: string
	},
	projects: {
		projects: IProjects[]
	},
}
