import { Router } from "express"
import { register, login, resendCode } from "./auth.controller.js"
import {
  registerValidator,
  loginValidator,
  resendValidator
} from "../middlewares/auth.validator.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación y acceso al sistema
 */

/**
 * @swagger
 * /academicTutoringManagement/v1/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario (Estudiante, Tutor, Profesor o Admin)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 example: usuario@kinal.edu.gt
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register", registerValidator, register)

/**
 * @swagger
 * /academicTutoringManagement/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión con correo, contraseña y código de verificación
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@kinal.edu.gt
 *               password:
 *                 type: string
 *                 format: password
 *               code:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve token
 *       400:
 *         description: Credenciales inválidas o código incorrecto
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", loginValidator, login)

/**
 * @swagger
 * /academicTutoringManagement/v1/auth/resend-code:
 *   post:
 *     summary: Reenviar código de verificación al correo registrado
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@kinal.edu.gt
 *     responses:
 *       200:
 *         description: Código enviado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post("/resend-code", resendValidator, resendCode)

export default router
