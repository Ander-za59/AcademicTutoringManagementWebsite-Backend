import { Router } from "express"
import { getMySessions, createSession } from "./session.controller.js"
import { createSessionValidator } from "../middlewares/session.validators.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Sesiones
 *   description: Endpoints para las sesiones de tutoría
 */

/**
 * @swagger
 * /academicTutoringManagement/v1/sessions/mine:
 *   get:
 *     summary: Obtener las sesiones del tutor actual
 *     tags: [Sesiones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sesiones del tutor
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener sesiones
 */
router.get("/mine", getMySessions)

/**
 * @swagger
 * /academicTutoringManagement/v1/sessions:
 *   post:
 *     summary: Crear nueva sesión de tutoría (solo TUTOR)
 *     tags: [Sesiones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - day
 *               - time
 *               - place
 *               - course
 *               - type
 *             properties:
 *               day:
 *                 type: string
 *                 enum: [Lunes, Martes, Miércoles, Jueves, Viernes, Sábado]
 *               time:
 *                 type: string
 *               place:
 *                 type: string
 *                 enum: [Teams, Zoom, Google Meet, Presencial]
 *               course:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [Repaso, Dudas, Revisión general]
 *               link:
 *                 type: string
 *                 format: uri
 *     responses:
 *       201:
 *         description: Sesión creada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al crear sesión
 */
router.post("/", createSessionValidator, createSession)

export default router
