import { Router } from "express"
import {
  getStudentsByCourse,
  promoteToTutor,
  removeTutor,
  getTutorNotes,
  updateTutorNote
} from "./professor.controller.js"
import {
  getStudentsByCourseValidator,
  promoteToTutorValidator,
  removeTutorValidator,
  getTutorNotesValidator,
  updateTutorNoteValidator
} from "../middlewares/professor.validators.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Profesores
 *   description: Funcionalidades para docentes
 */

/**
 * @swagger
 * /academicTutoringManagement/v1/professors/students:
 *   get:
 *     summary: Obtener estudiantes de los cursos asignados
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *       401:
 *         description: No autorizado
 */
router.get("/students", getStudentsByCourseValidator, getStudentsByCourse)

/**
 * @swagger
 * /academicTutoringManagement/v1/professors/promote:
 *   post:
 *     summary: Promover estudiante a tutor
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentUserId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tutor creado
 */
router.post("/promote", promoteToTutorValidator, promoteToTutor)

/**
 * @swagger
 * /academicTutoringManagement/v1/professors/remove/{tutorUserId}:
 *   delete:
 *     summary: Quitar tutoría a un estudiante
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tutorUserId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tutor eliminado
 */
router.delete("/remove/:tutorUserId", removeTutorValidator, removeTutor)

/**
 * @swagger
 * /academicTutoringManagement/v1/professors/notes/{tutorId}:
 *   get:
 *     summary: Obtener notas de un tutor
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tutorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de notas
 */
router.get("/notes/:tutorId", getTutorNotesValidator, getTutorNotes)

/**
 * @swagger
 * /academicTutoringManagement/v1/professors/notes/{noteId}:
 *   put:
 *     summary: Editar una nota
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: string
 *               bimester:
 *                 type: integer
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: Nota actualizada
 */
router.put("/notes/:noteId", updateTutorNoteValidator, updateTutorNote)

export default router
