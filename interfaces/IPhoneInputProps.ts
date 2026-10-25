export interface IPhoneInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalidMessage?: string;
}
