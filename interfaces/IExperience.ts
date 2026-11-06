export interface IExperience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string[];
}
