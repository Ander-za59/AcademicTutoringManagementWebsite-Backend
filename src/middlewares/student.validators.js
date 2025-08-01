import { param, body } from "express-validator"
import { validateFields } from "./validateFields.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const getAvailableTutorsValidator = [
  validateJWT,
  hasRoles("ESTUDIANTE"),
  param("courseId").isMongoId(),
  validateFields,
  handleErrors
]

export const applyToTutorValidator = [
  validateJWT,
  hasRoles("ESTUDIANTE"),
  body("courseId").isMongoId(),
  body("tutorId").isMongoId(),
  validateFields,
  handleErrors
]

export const leaveTutorValidator = [
  validateJWT,
  hasRoles("ESTUDIANTE"),
  param("courseId").isMongoId(),
  validateFields,
  handleErrors
]

export const getMyTutorsValidator = [
  validateJWT,
  hasRoles("ESTUDIANTE"),
  validateFields,
  handleErrors
]
