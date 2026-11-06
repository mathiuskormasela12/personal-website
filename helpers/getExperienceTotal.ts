import { IExperience, IExperienceTotal } from '../interfaces';
import { getCurrentMonth, toMonthIndex } from './getDuration';

export const getExperienceTotal = (
  experiences: IExperience[],
  now: Date = new Date(),
): IExperienceTotal => {
  const months = new Set<number>();
  const currentMonth = getCurrentMonth(now);

  experiences.forEach(({ startDate, endDate }) => {
    const end = toMonthIndex(endDate ?? currentMonth);

    for (let month = toMonthIndex(startDate); month <= end; month += 1) {
      months.add(month);
    }
  });

  return {
    months: months.size,
    companies: new Set(experiences.map(({ company }) => company)).size,
  };
};
