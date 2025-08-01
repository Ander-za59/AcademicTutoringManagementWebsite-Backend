import { Router } from "express"
import { getOwnNotes, assignNote } from "./note.controller.js"
import { getOwnNotesValidator, assignNoteValidator } from "../middlewares/note.validators.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Gestión de notas académicas
 */

/**
 * @swagger
 * /academicTutoringManagement/v1/notes/mine:
 *   get:
 *     summary: Obtener mis notas como estudiante/tutor
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notas obtenidas exitosamente
 *       404:
 *         description: No se encontraron notas
 */
router.get("/mine", getOwnNotesValidator, getOwnNotes)

/**
 * @swagger
 * /academicTutoringManagement/v1/notes/assign:
 *   post:
 *     summary: Asignar o actualizar nota (profesor)
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [studentId, grade, bimestre, courseId, score]
 *             properties:
 *               studentId:
 *                 type: string
 *               grade:
 *                 type: number
 *                 enum: [4, 5, 6]
 *               bimestre:
 *                 type: number
 *                 enum: [1, 2, 3, 4]
 *               courseId:
 *                 type: string
 *               score:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *     responses:
 *       200:
 *         description: Nota asignada correctamente
 *       500:
 *         description: Error interno
 */
router.post("/assign", assignNoteValidator, assignNote)

export default router
