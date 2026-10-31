import { IExperience, IExperienceGroup } from '../interfaces';

const sameCompany = (first: string, second: string) =>
  first.trim().toLowerCase() === second.trim().toLowerCase();

export const groupByCompany = (
  experiences: IExperience[],
): IExperienceGroup[] =>
  experiences.reduce<IExperienceGroup[]>((groups, experience) => {
    const last = groups[groups.length - 1];

    if (last && sameCompany(last.company, experience.company)) {
      return [
        ...groups.slice(0, -1),
        { ...last, roles: [...last.roles, experience] },
      ];
    }

    return [...groups, { company: experience.company, roles: [experience] }];
  }, []);
