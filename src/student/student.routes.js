import { Router } from "express"
import {
  getAvailableTutors,
  applyToTutor,
  getMyTutors,
  leaveTutor
} from "./student.controller.js"
import {
  getAvailableTutorsValidator,
  applyToTutorValidator,
  getMyTutorsValidator,
  leaveTutorValidator
} from "../middlewares/student.validators.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Funcionalidades relacionadas con estudiantes
 */

/**
 * @swagger
 * /academicTutoringManagement/v1/students/tutors/{courseId}:
 *   get:
 *     summary: Ver tutores disponibles para un curso
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de tutores disponibles
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.get("/tutors/:courseId", getAvailableTutorsValidator, getAvailableTutors)

/**
 * @swagger
 * /academicTutoringManagement/v1/students/apply:
 *   post:
 *     summary: Aplicar a un tutor por curso
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - tutorId
 *             properties:
 *               courseId:
 *                 type: string
 *               tutorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aplicación exitosa
 *       400:
 *         description: Ya está inscrito o tutor no disponible
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.post("/apply", applyToTutorValidator, applyToTutor)

/**
 * @swagger
 * /academicTutoringManagement/v1/students/my-tutors:
 *   get:
 *     summary: Obtener los tutores actuales del estudiante
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tutores inscritos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.get("/my-tutors", getMyTutorsValidator, getMyTutors)

/**
 * @swagger
 * /academicTutoringManagement/v1/students/leave/{courseId}:
 *   delete:
 *     summary: Salirse de un grupo de tutoría
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso del que se quiere salir
 *     responses:
 *       200:
 *         description: Salida exitosa
 *       404:
 *         description: No estaba inscrito en ese curso
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.delete("/leave/:courseId", leaveTutorValidator, leaveTutor)

export default router
