import { body, param } from "express-validator"
import { validateFields } from "./validateFields.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const getStudentsByCourseValidator = [
  validateJWT,
  hasRoles("PROFESOR"),
  validateFields,
  handleErrors
]

export const promoteToTutorValidator = [
  validateJWT,
  hasRoles("PROFESOR"),
  body("studentUserId").isMongoId(),
  validateFields,
  handleErrors
]

export const removeTutorValidator = [
  validateJWT,
  hasRoles("PROFESOR"),
  param("tutorUserId").isMongoId(),
  validateFields,
  handleErrors
]

export const getTutorNotesValidator = [
  validateJWT,
  hasRoles("PROFESOR"),
  param("tutorId").isMongoId(),
  validateFields,
  handleErrors
]

export const updateTutorNoteValidator = [
  validateJWT,
  hasRoles("PROFESOR"),
  param("noteId").isMongoId(),
  body("grade").isIn(["4to", "5to", "6to"]),
  body("bimester").isInt({ min: 1, max: 4 }),
  body("score").isNumeric().custom(score => score >= 0 && score <= 100),
  validateFields,
  handleErrors
]
