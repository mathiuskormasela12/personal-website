// ========== Services
// import all modules
import http from './http';
import {
  IForgotPasswordBody,
  IGetProjectsQueries,
  ILoginBody,
  IRegisterBody,
  IResetPasswordBody,
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

  public static getAllProjects(data: IGetProjectsQueries) {
    const queries: string = `${Object.keys(data).map((item, index) => `${item}=${Object.values(data)[index]}`).join('&')}`;
    return http().get(`/projects?${queries}`);
  }

  public static getDetailProject(id: number) {
    return http().get(`/project/${id}`);
  }

  public static createProject(data: FormData) {
    return http().post('/project', data);
  }

  public static deleteProject(id: number) {
    return http().delete(`/project/${id}`);
  }

  public static updateProject(id: number, data: FormData) {
    return http().patch(`/project/${id}`, data);
  }
}

export default Services;
