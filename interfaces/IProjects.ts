// ========== IProjects
// import all modules
import { ITechnology } from './ITechnology';

export interface IProjects {
	id: number;
	title: string;
	description: string;
	img: string;
	technologies: ITechnology[];
}
