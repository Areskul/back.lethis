import jwt from "jwt-simple";
import "dotenv/config";

const APP_SECRET = process.env.APP_SECRET!;

export function decode(token: string) {
  token = token.replace("Bearer ", "");
  //token = token.substring(1, token.length - 1);
  const decoded = token ? jwt.decode(token, APP_SECRET) : "";
  return decoded;
}
export function encode(obj: object) {
  const token = obj ? jwt.encode(obj, APP_SECRET) : undefined;
  return token;
}
