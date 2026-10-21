// ========== Get User Id From Reset Token
import { jwtDecode } from 'jwt-decode';

export const getUserIdFromResetToken = (token: string): number => {
  const { id } = jwtDecode<{ id: number | string }>(token);
  return Number(id);
};
