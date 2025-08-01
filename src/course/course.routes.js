import { Router } from "express"
import { createCourse, getCourses } from "./course.controller.js"
import { createCourseValidator } from "../middlewares/course.validators.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Endpoints para la gestión de cursos
 */

/**
 * @swagger
 * /academicTutoringManagement/v1/courses:
 *   get:
 *     summary: Obtener todos los cursos activos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *       500:
 *         description: Error al obtener cursos
 */
router.get("/", getCourses)

/**
 * @swagger
 * /academicTutoringManagement/v1/courses:
 *   post:
 *     summary: Crear un nuevo curso (solo ADMIN)
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Curso creado
 *       400:
 *         description: Curso ya existe
 *       500:
 *         description: Error al crear curso
 */
router.post("/", createCourseValidator, createCourse)

export default router
