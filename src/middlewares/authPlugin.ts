import jwt from "jwt-simple";
const APP_SECRET = "iamironman";
export function decode(token: string) {
  const decoded = token ? jwt.decode(token, APP_SECRET) : "";
  return decoded;
}
export function encode(obj: object) {
  const token = obj ? jwt.encode(obj, APP_SECRET) : "";
  return token;
}
