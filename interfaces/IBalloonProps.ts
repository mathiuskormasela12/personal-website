// =========== IBalloonProps

export interface IBalloonProps {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  rotate: number;
  customPosition?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  hiddenWhenSize: number;
}
