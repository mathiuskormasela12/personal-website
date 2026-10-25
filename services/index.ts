// ========== Services
// import all modules
import http from './http';
import {
  IForgotPasswordBody,
  IGetProjectsQueries,
  IHero,
  ILoginBody,
  IRegisterBody,
  IResetPasswordBody,
} from '../interfaces';

const HERO_REQUEST_TIMEOUT_MS = 5000;

class Services {
  public static getHero() {
    return http().get('/hero', { timeout: HERO_REQUEST_TIMEOUT_MS });
  }

  public static updateHero(data: IHero) {
    return http().patch('/hero', data);
  }

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
    const queries: string = `${Object.keys(data)
      .map((item, index) => `${item}=${Object.values(data)[index]}`)
      .join('&')}`;
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
