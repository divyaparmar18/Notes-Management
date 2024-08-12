import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/password";

/**
 * Middleware to verify JWT token from the request headers.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} A Promise representing the completion of the verification operation.
 */
export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = await verifyToken(token);
    (req as any).user = payload; // Attach user info to request
    next();
  } catch (err) {
    res.status(StatusCodes.FORBIDDEN).send({ error: "Invalid token" });
  }
};
