import { body } from "express-validator"
import { validateFields } from "./validateFields.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { handleErrors } from "./handle-errors.js"

export const createTutorValidator = [
  validateJWT,
  hasRoles("PROFESOR"),
  body("userId").notEmpty().withMessage("ID del estudiante requerido"),
  body("grade").isIn([4, 5, 6]),
  body("maxStudents").optional().isNumeric(),
  body("courses").isArray(),
  validateFields,
  handleErrors
]

export const updateOwnTutorValidator = [
  validateJWT,
  hasRoles("TUTOR"),
  body("maxStudents").optional().isNumeric(),
  body("visible").optional().isBoolean(),
  body("horarios").optional().isArray(),
  validateFields,
  handleErrors
]
