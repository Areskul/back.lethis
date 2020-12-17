import jwt from "jwt-simple";
const APP_SECRET = "iamironman";
export function authPlugin(token: string) {
  const decoded = token ? jwt.decode(token, APP_SECRET) : "";
  return decoded;
}
