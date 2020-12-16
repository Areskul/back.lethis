import jwt from "express-jwt";
const APP_SECRET = "iamironman";
export default jwt({
  secret: APP_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  credentialsRequired: false,
});
