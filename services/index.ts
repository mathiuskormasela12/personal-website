// ========== Services
// import all modules
import http from './http';
import {
  IForgotPasswordBody, ILoginBody, IRegisterBody, IResetPasswordBody,
} from '../interfaces';

class Services {
  public static login(data: ILoginBody) {
    return http().post('/auth/login', data);
  }

  public static register(data: IRegisterBody) {
    return http().post('/auth/register', data);
  }

  public static forgotPassword(data: IForgotPasswordBody) {
    return http().post('/user/password', data);
  }

  public static resetPassword(id: number, data: IResetPasswordBody) {
    return http().patch(`/user/password/${id}`, data);
  }
}

export default Services;
