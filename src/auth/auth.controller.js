import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'
import { generarCodigoVerificacionUnico } from '../helpers/generateCode.js'

const allowedDomains = ['kinal.edu.gt', 'gmail.com']

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const domain = email.split('@')[1]

    if (!allowedDomains.includes(domain)) {
      return res.status(400).json({ msg: 'Solo se permiten correos de kinal.edu.gt o gmail.com' })
    }

    const emailExists = await User.findOne({ email })
    if (emailExists) {
      return res.status(400).json({ msg: 'El correo ya está registrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const code = generarCodigoVerificacionUnico()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutos

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'ESTUDIANTE',
      emailVerificationCode: code,
      codeExpiresAt: expiresAt
    })

    await newUser.save()

    res.status(201).json({ msg: 'Usuario registrado. Revisa tu correo para el código de verificación.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Error en el servidor' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, code } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ msg: 'Correo o contraseña incorrectos' })

    const validPass = await bcrypt.compare(password, user.password)
    if (!validPass) return res.status(401).json({ msg: 'Correo o contraseña incorrectos' })

    if (user.emailVerificationCode !== code)
      return res.status(401).json({ msg: 'Código de verificación incorrecto' })

    if (Date.now() > user.codeExpiresAt)
      return res.status(401).json({ msg: 'El código ha expirado. Solicita uno nuevo.' })

    const token = jwt.sign({ uid: user._id }, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '6h'
    })

    res.status(200).json({ msg: 'Login exitoso', token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Error en el servidor' })
  }
}

export const resendCode = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' })

    const code = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

    user.emailVerificationCode = code
    user.codeExpiresAt = expiresAt
    await user.save()

    res.status(200).json({ msg: 'Código reenviado correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Error en el servidor' })
  }
}
