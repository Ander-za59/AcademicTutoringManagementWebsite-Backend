import User from "./user.model.js"
import { hash } from "argon2"
import { generarCodigoVerificacionUnico } from "../helpers/generateCode.js"

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params
    const user = await User.findById(uid)

    if (!user || !user.status) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ message: "Error interno", error: err.message })
  }
}

// Obtener todos los usuarios (solo admin)
export const getUsers = async (req, res) => {
  try {
    const { limit = 20, from = 0 } = req.query
    const filter = { status: true }

    const [total, users] = await Promise.all([
      User.countDocuments(filter),
      User.find(filter).skip(Number(from)).limit(Number(limit))
    ])

    res.status(200).json({ total, users })
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuarios", error: err.message })
  }
}

// Actualizar perfil propio (solo ESTUDIANTE)
export const updateOwnUser = async (req, res) => {
  try {
    const { _id, role } = req.usuario

    if (role !== "ESTUDIANTE") {
      return res.status(403).json({ message: "Solo estudiantes pueden editar su perfil" })
    }

    const { name } = req.body
    const updated = await User.findByIdAndUpdate(_id, { name }, { new: true })

    res.status(200).json({ message: "Datos actualizados", user: updated })
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar", error: err.message })
  }
}

// Admin puede actualizar usuarios (menos a otros admins)
export const updateUserByAdmin = async (req, res) => {
  try {
    const { uid } = req.params
    const admin = req.usuario

    const user = await User.findById(uid)
    if (!user || user.role === "ADMIN") {
      return res.status(403).json({ message: "No puedes modificar a otro admin" })
    }

    const { password, role, ...rest } = req.body
    const updated = await User.findByIdAndUpdate(uid, rest, { new: true })

    res.status(200).json({ message: "Usuario actualizado", user: updated })
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar usuario", error: err.message })
  }
}

// Eliminar usuario (lógicamente)
export const deleteUserByAdmin = async (req, res) => {
  try {
    const { uid } = req.params
    const admin = req.usuario

    const user = await User.findById(uid)
    if (!user || user.role === "ADMIN" || user._id.toString() === admin._id.toString()) {
      return res.status(403).json({ message: "No puedes eliminar este usuario" })
    }

    await User.findByIdAndUpdate(uid, { status: false })
    res.status(200).json({ message: "Usuario eliminado lógicamente" })
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar", error: err.message })
  }
}

export const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@kinal.edu.gt' })

    if (existingAdmin) {
      console.log('ℹEl administrador por defecto ya existe.')
      return
    }

    const hashedPassword = await hash('Admin123!')
    const verificationCode = await generarCodigoVerificacionUnico()

    const admin = new User({
      name: 'Administrador del sistema',
      email: 'admin@kinal.edu.gt',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerificationCode: verificationCode,
      codeExpiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutos
      status: true
    })

    await admin.save()
    console.log('Administrador por defecto creado correctamente.')
  } catch (err) {
    console.error('Error al crear el administrador por defecto:', err.message)
  }
}
