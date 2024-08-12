import { userRepo } from "../config/db-config";
import { USER_LOGGED_IN, USER_REGISTERED } from "../constants/message";
import {
  InvalidCredentials,
  NoUserFound,
  UserExistError,
} from "../constants/error";
import { userInput } from "../interfaces/user";
import {
  generatePassword,
  generateSalt,
  generateToken,
  validatePassword,
} from "../utils/password";

export const registerUser = async (userInput: userInput) => {
  try {
    const { email, password } = userInput;
    const userExists = await userRepo.findOne({ where: { email } });
    if (userExists) {
      return UserExistError;
    }
    const salt = await generateSalt();
    const hashedPassword = await generatePassword(password, salt);
    const createdUser = userRepo.create({
      email,
      password: hashedPassword,
    });
    const userSaved = await userRepo.save(createdUser);
    return {
      success: true,
      message: USER_REGISTERED,
      data: userSaved,
    };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userInput: userInput) => {
  try {
    const { email, password } = userInput;
    const userData = await userRepo.findOne({ where: { email } });
    if (userData) {
      const validation = await validatePassword(
        password,
        userData.password,
        userData.salt
      );
      if (validation) {
        const token = generateToken(userData.id);
        return {
          success: true,
          message: USER_LOGGED_IN,
          data: token,
        };
      }
      return InvalidCredentials;
    }
    return NoUserFound;
  } catch (error) {
    throw error;
  }
};
