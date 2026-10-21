// ========== SetTokenFunc
// import all modules
import { IAuthReduxAction } from '../interfaces';

// eslint-disable-next-line no-unused-vars
export type SetTokenFunc = (
  accessToken: string,
  refreshToken: string,
) => IAuthReduxAction;
