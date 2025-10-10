/* eslint-disable prettier/prettier */
export interface JwtPayload {
  sub: string;
  user_id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}