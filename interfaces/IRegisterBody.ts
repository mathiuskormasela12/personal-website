// ========== IRegisterBody
// import all modules
import { ILoginBody } from './ILoginBody';

export interface IRegisterBody extends ILoginBody {
	repeatPassword: string;
}
