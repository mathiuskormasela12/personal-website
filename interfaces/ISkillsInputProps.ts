export interface ISkillsInputProps {
  id: string;
  skills: string[];
  onChange: (skills: string[]) => void;
  invalidMessage?: string;
}
