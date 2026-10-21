// ========== IHomeStates
// import all modules
import { IProjects } from './IProjects';

export interface IHomeStates {
  loading: boolean;
  projects: IProjects[];
}
