import { body } from 'express-validator'
import { validateFields } from './validateFields.js'
import { handleErrors } from "./handle-errors.js"

// Validador de registro
export const registerValidator = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('email')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Correo inválido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }).withMessage('La contraseña debe ser fuerte (8+ caracteres, mayúscula, número y símbolo)'),
  validateFields,
  handleErrors
]

// Validador de login
export const loginValidator = [
  body('email').isEmail().withMessage('Correo inválido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  body('code')
    .notEmpty().withMessage('El código es obligatorio')
    .isLength({ min: 10, max: 10 }).withMessage('El código debe tener 10 dígitos'),
  validateFields,
  handleErrors
]

// Validador para reenviar código
export const resendValidator = [
  body('email')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Correo inválido'),
  validateFields,
  handleErrors
]
