import { TOKEN_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  let payload = null;
  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    payload = data;
  });
  return payload;
};

global.localStorage;
export const auth = (req, res, next) => {
  if (
    [
      "/v1/user/register",
      "/v1/user/register/",
      "/v1/user/login",
    ].includes(req.path)
  ) {
    next();
  } else {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const user = verifyToken(token);
    if (token && user.userId) {
      req.userId = user.userId;

      next();
    } else {
      res.status(401).json({ message: "Unauthorized access" });
    }
  }
};
