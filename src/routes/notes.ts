import * as express from "express";
import {
  handleCreateNote,
  handleFetchNoteById,
  handleQueryNotesByTitle,
  handleUpdateNote,
} from "../controllers/notesController";

const notesRouter = express.Router();

/**
 * @swagger
 * /notes:
 *   post:
 *     description: Create a new note
 *     summary: Create a note
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Meeting Notes"
 *               content:
 *                 type: string
 *                 example: "Discuss project roadmap"
 *     responses:
 *       '200':
 *         description: Note created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */
notesRouter.post("/notes", handleCreateNote);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     description: Update an existing note
 *     summary: Update a note
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Meeting Notes"
 *               content:
 *                 type: string
 *                 example: "Updated project roadmap"
 *     responses:
 *       '200':
 *         description: Note updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Note not found
 *       '500':
 *         description: Internal server error
 */
notesRouter.put("/notes/:id", handleUpdateNote);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     description: Retrieve a note by its ID
 *     summary: Get a note
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Note retrieved successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Note not found
 *       '500':
 *         description: Internal server error
 */
notesRouter.get("/notes/:id", handleFetchNoteById);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     description: Delete a note by its ID
 *     summary: Delete a note
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Note deleted successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Note not found
 *       '500':
 *         description: Internal server error
 */
// notesRouter.delete("/notes/:id", validateToken, deleteNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     description: List all notes
 *     summary: List notes
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Notes
 *     responses:
 *       '200':
 *         description: Notes retrieved successfully
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */
notesRouter.get("/notes", handleQueryNotesByTitle);

export default notesRouter;
