import jwt from "jsonwebtoken";
import env from "./env";

const JWT_SECRET = env.JWT_SECRET
const JWT = {
  sign: (payload, options = {}) => {
    const { expiresIn } = options;

    const token = expiresIn
      ? jwt.sign(payload, JWT_SECRET, { expiresIn })
      : jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
    return token;
  },

  verify: (token) => {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  },
};

export default JWT ;
