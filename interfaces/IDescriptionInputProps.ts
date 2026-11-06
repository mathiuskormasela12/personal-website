export interface IDescriptionInputProps {
  id: string;
  points: string[];
  onChange: (points: string[]) => void;
  pointErrors?: (string | undefined)[];
  invalidMessage?: string;
}
