import { IExperienceBody } from './IExperienceBody';

export type IExperienceErrors = Partial<
  Record<keyof IExperienceBody, string>
> & {
  points?: (string | undefined)[];
};
