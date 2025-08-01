import { body, param } from "express-validator"
import { validateFields } from "./validateFields.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const getUserByIdValidator = [
  validateJWT,
  param("uid").notEmpty().withMessage("Debe proporcionar un UID"),
  hasRoles("ADMIN"),
  validateFields
]

export const getUsersValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  validateFields
]

export const updateOwnUserValidator = [
  validateJWT,
  hasRoles("ESTUDIANTE"),
  body("name").optional().isString(),
  validateFields
]

export const updateUserByAdminValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  param("uid").notEmpty().withMessage("Debe proporcionar un UID válido"),
  body("name").optional().isString(),
  body("role").optional().isIn(["ESTUDIANTE", "TUTOR", "PROFESOR"]),
  validateFields
]

export const deleteUserByAdminValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  param("uid").notEmpty().withMessage("Debe proporcionar un UID válido"),
  validateFields
]
