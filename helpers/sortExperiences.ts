import { IExperience } from '../interfaces';

export const sortExperiences = (experiences: IExperience[]): IExperience[] =>
  [...experiences].sort((first, second) => {
    const currentFirst =
      Number(second.endDate === null) - Number(first.endDate === null);

    if (currentFirst !== 0) {
      return currentFirst;
    }

    if (first.startDate !== second.startDate) {
      return first.startDate < second.startDate ? 1 : -1;
    }

    return second.id - first.id;
  });
