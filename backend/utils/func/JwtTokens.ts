import jwt from "jsonwebtoken";
import {
  CLIENT_SCREE_JWT,
  JWT_SECRET,
  REFRESH_SECRET,
} from "../../constants/Env.js";

interface TokenPayload {
  id: number;
}

const createToken = (userId: number) => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  const token = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

const createRefreshToken = (userId: number) => {
  try {
    if (!REFRESH_SECRET) throw new Error("JWT_SECRET is not defined");

    const token = jwt.sign({ id: userId }, REFRESH_SECRET, {
      expiresIn: "5d",
    });
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const createUserToken = () => {
  if (!CLIENT_SCREE_JWT) throw new Error("CONST JWT_SECRET is not defined");
  try {
    const token = jwt.sign({}, CLIENT_SCREE_JWT);
    return token;
  } catch (error) {
    console.error(error);
  }
};

const verifyToken = (token: string, SECRET: string): TokenPayload => {
  if (!SECRET) throw new Error("JWT_SECRET is not defined");

  try {
    const decoded = jwt.verify(token, SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export { createToken, verifyToken, decodeToken, createRefreshToken };
