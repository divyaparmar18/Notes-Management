import { sign, verify } from "jsonwebtoken";
import { genSalt, hash } from "bcrypt";

const secret = process.env.JWT_SECRET || "your_jwt_secret";

export const generateSalt = async () => {
  return await genSalt();
};

export const generatePassword = async (password: string, salt: string) => {
  return await hash(password, salt);
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await generatePassword(enteredPassword, salt)) === savedPassword;
};

/**
 * Generates a JWT token for a user.
 *
 * @param {string} userId - The user's ID.
 * @returns {string} The JWT token.
 */
export const generateToken = (userId: string): string => {
  return sign({ id: userId }, secret, { expiresIn: "1h" });
};

/**
 * Verifies a JWT token and extracts the payload.
 *
 * @param {string} token - The JWT token.
 * @returns {Promise<any>} The token payload.
 */
export const verifyToken = async (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });
};
