import { body } from "express-validator"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { validateFields } from "./validateFields.js"
import { handleErrors } from "./handle-errors.js"

export const createCourseValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("description").optional().isString(),
  validateFields,
  handleErrors
]
