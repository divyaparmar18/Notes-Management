import { IResponse } from "../interfaces/common";
import { notesRepo } from "../config/db-config";
import { Like } from "typeorm";
import { NoteInput, NoteUpdateInput } from "../interfaces/notes";
import {
  NOTE_CREATED,
  NOTE_UPDATED,
  NOTES_FETCHED,
} from "../constants/message";
import { NOTE_NOT_FOUND } from "../constants/error";

/**
 * Creates a new note and returns a response.
 *
 * @param {NoteInput} noteInput - The details of the note to create.
 * @returns {Promise<IResponse>} A promise representing the creation operation.
 */
export const createNote = async (noteInput: NoteInput): Promise<IResponse> => {
  try {
    const { title, body } = noteInput;
    const createdNote = notesRepo.create({
      title,
      body,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const savedNote = await notesRepo.save(createdNote);
    return {
      success: true,
      message: NOTE_CREATED,
      data: savedNote,
    };
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || "Failed to create note.",
    };
  }
};

/**
 * Fetches a note by its ID and returns a response.
 *
 * @param {string} noteId - The ID of the note to fetch.
 * @returns {Promise<IResponse>} A promise representing the fetch operation.
 */
export const fetchNoteById = async (noteId: string): Promise<IResponse> => {
  try {
    const note = await notesRepo.findOne({ where: { id: noteId } });
    if (note) {
      return {
        success: true,
        message: NOTES_FETCHED,
        data: note,
      };
    }
    return NOTE_NOT_FOUND;
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || "Failed to fetch notes.",
    };
  }
};

/**
 * Queries notes by title substring and returns a response.
 *
 * @param {string} titleSubstring - The substring to search for in note titles.
 * @returns {Promise<IResponse>} A promise representing the query operation.
 */
export const queryNotesByTitle = async (
  titleSubstring: string
): Promise<IResponse> => {
  try {
    const notes = await notesRepo.find({
      where: {
        title: Like(`%${titleSubstring}%`),
      },
    });
    return {
      success: true,
      message: NOTES_FETCHED,
      data: notes,
    };
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || "Failed to query notes.",
    };
  }
};

/**
 * Updates a note by its ID and returns a response.
 *
 * @param {string} noteId - The ID of the note to update.
 * @param {NoteUpdateInput} noteUpdateInput - The details to update the note with.
 * @returns {Promise<IResponse>} A promise representing the update operation.
 */
export const updateNote = async (
  noteId: string,
  noteUpdateInput: NoteUpdateInput
): Promise<IResponse> => {
  try {
    const note = await notesRepo.findOne({ where: { id: noteId } });
    if (note) {
      const updatedNote = {
        ...note,
        ...noteUpdateInput,
        updated_at: new Date(),
      };
      const savedNote = await notesRepo.save(updatedNote);
      return {
        success: true,
        message: NOTE_UPDATED,
        data: savedNote,
      };
    }
    return NOTE_NOT_FOUND;
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || "Failed to update note.",
    };
  }
};

// export const deleteNote = async (
//   noteInput: NoteInput
// ): Promise<IResponse> => {};
