import jwt from "jwt-simple";

export function decode(token: string, secret: string) {
  token = token.replace("Bearer ", "");
  //token = token.substring(1, token.length - 1);
  const decoded = token ? jwt.decode(token, secret) : "";
  return decoded;
}
export function encode(obj: object, secret: string) {
  const token = obj ? jwt.encode(obj, secret) : undefined;
  return token;
}
