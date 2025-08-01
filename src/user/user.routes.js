import { Router } from "express"
import {
  getUserById,
  getUsers,
  updateOwnUser,
  updateUserByAdmin,
  deleteUserByAdmin
} from "./user.controller.js"
import {
  getUserByIdValidator,
  getUsersValidator,
  updateOwnUserValidator,
  updateUserByAdminValidator,
  deleteUserByAdminValidator
} from "../middlewares/user.validator.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios en el sistema
 */

/**
 * @swagger
 * /academicTutoringManagement/v1/user:
 *   get:
 *     summary: Obtener todos los usuarios (solo admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get("/", getUsersValidator, getUsers)

/**
 * @swagger
 * /academicTutoringManagement/v1/user/{uid}:
 *   get:
 *     summary: Obtener un usuario por su ID (solo admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario (MongoID)
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/:uid", getUserByIdValidator, getUserById)

/**
 * @swagger
 * /academicTutoringManagement/v1/user/me:
 *   put:
 *     summary: Actualizar perfil propio (solo estudiante)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.put("/me", updateOwnUserValidator, updateOwnUser)

/**
 * @swagger
 * /academicTutoringManagement/v1/user/{uid}:
 *   put:
 *     summary: Actualizar un usuario por ID (solo admin, no admins)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ESTUDIANTE, TUTOR, PROFESOR]
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.put("/:uid", updateUserByAdminValidator, updateUserByAdmin)

/**
 * @swagger
 * /academicTutoringManagement/v1/user/{uid}:
 *   delete:
 *     summary: Eliminar usuario por ID (solo admin, no admins ni a sí mismo)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:uid", deleteUserByAdminValidator, deleteUserByAdmin)

export default router
