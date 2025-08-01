import { Router } from "express"
import {
  createTutor,
  updateOwnTutorProfile,
  getTutoresByCourse
} from "./tutor.controller.js"
import {
  createTutorValidator,
  updateOwnTutorValidator
} from "../middlewares/tutor.validators.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Tutores
 *   description: Gestión de tutores académicos
 */

/**
 * @swagger
 * /academicTutoringManagement/v1/tutor/create:
 *   post:
 *     summary: Convertir estudiante en tutor (solo profesor)
 *     tags: [Tutores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - grade
 *               - courses
 *             properties:
 *               userId:
 *                 type: string
 *               grade:
 *                 type: number
 *                 enum: [4, 5, 6]
 *               maxStudents:
 *                 type: number
 *               courses:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Tutor creado correctamente
 *       400:
 *         description: Datos inválidos o tutor ya existe
 *       500:
 *         description: Error interno
 */
router.post("/create", createTutorValidator, createTutor)

/**
 * @swagger
 * /academicTutoringManagement/v1/tutor/update:
 *   put:
 *     summary: Actualizar perfil del tutor (propio)
 *     tags: [Tutores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxStudents:
 *                 type: number
 *               visible:
 *                 type: boolean
 *               horarios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     dia:
 *                       type: string
 *                     hora:
 *                       type: string
 *                     lugar:
 *                       type: string
 *                     curso:
 *                       type: string
 *                     tipo:
 *                       type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Tutor no encontrado
 *       500:
 *         description: Error interno
 */
router.put("/update", updateOwnTutorValidator, updateOwnTutorProfile)

/**
 * @swagger
 * /academicTutoringManagement/v1/tutor/course/{courseId}:
 *   get:
 *     summary: Obtener tutores disponibles por curso (visibles)
 *     tags: [Tutores]
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
 *         description: Lista de tutores encontrados
 *       500:
 *         description: Error interno
 */
router.get("/course/:courseId", getTutoresByCourse)

export default router
