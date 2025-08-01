import { body } from "express-validator"
import { validateFields } from "./validateFields.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { handleErrors } from "./handle-errors.js"

export const getOwnNotesValidator = [
  validateJWT,
  hasRoles("ESTUDIANTE", "TUTOR"),
  validateFields,
  handleErrors
]

export const assignNoteValidator = [
  validateJWT,
  hasRoles("PROFESOR"),
  body("studentId").notEmpty(),
  body("grade").isIn([4, 5, 6]),
  body("bimestre").isIn([1, 2, 3, 4]),
  body("courseId").notEmpty(),
  body("score").isNumeric().isFloat({ min: 0, max: 100 }),
  validateFields,
  handleErrors
]
