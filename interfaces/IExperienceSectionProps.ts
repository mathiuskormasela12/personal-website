import { IExperience } from './IExperience';

export interface IExperienceSectionProps {
  experiences: IExperience[];
  preview?: boolean;
  editingId?: number | null;
}
