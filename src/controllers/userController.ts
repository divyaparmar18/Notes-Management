import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/user";
import { StatusCodes } from "http-status-codes";
import { IResponse } from "../interfaces/common";
import { getStatus } from "../utils/status-helper";

/**
 * Handles user registration.
 *
 * @param {Request} req - The Express request object, user details in the request body.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the registration operation.
 */
export const userRegister = async (req: Request, res: Response) => {
  registerUser(req.body)
    .then((user: IResponse) => {
      const status = getStatus(user?.success);
      return res.status(status).send(user);
    })
    .catch((err: any) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};

/**
 * Handles user login.
 *
 * @param {Request} req - The Express request object, user credentials in the request body.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the login operation.
 */

export const userLogin = async (req: Request, res: Response) => {
  loginUser(req.body)
    .then((user: IResponse) => {
      const status = getStatus(user?.success);
      return res.status(status).send(user);
    })
    .catch((err: any) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};
