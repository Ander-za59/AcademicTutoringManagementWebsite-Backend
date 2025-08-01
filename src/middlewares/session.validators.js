import { body } from "express-validator"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { validateFields } from "./validateFields.js"
import { handleErrors } from "./handle-errors.js"

export const createSessionValidator = [
  validateJWT,
  hasRoles("TUTOR"),
  body("day").isIn(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]),
  body("time").notEmpty(),
  body("place").isIn(["Teams", "Zoom", "Google Meet", "Presencial"]),
  body("course").notEmpty(),
  body("type").isIn(["Repaso", "Dudas", "Revisión general"]),
  body("link").optional().isURL(),
  validateFields,
  handleErrors
]
