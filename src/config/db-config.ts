import { Note } from "../models/notes.model";
import { User } from "../models/user.model";
import { AppDataSource } from "./db";
const userRepo = AppDataSource.getRepository(User);
const notesRepo = AppDataSource.getRepository(Note);

export { userRepo, notesRepo };
