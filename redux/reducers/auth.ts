// ========== Auth Reducer
// import all modules
import type { UnknownAction } from '@reduxjs/toolkit';
import { IAuthGlobalStates, IAuthReduxAction } from '../../interfaces';

const initialStates: IAuthGlobalStates = {
  accessToken: '',
  refreshToken: '',
};

const authReducer = (
  states: IAuthGlobalStates = initialStates,
  action: UnknownAction,
): IAuthGlobalStates => {
  switch (action.type) {
    case 'SET_TOKEN': {
      const { data } = (action as IAuthReduxAction).payload;
      return {
        ...states,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    }

    default: {
      return {
        ...states,
      };
    }
  }
};

export default authReducer;
