import Tutor from "./tutor.model.js"
import User from "../user/user.model.js"

// Crear tutor (por un profesor)
export const createTutor = async (req, res) => {
  try {
    const { userId, grade, maxStudents, courses } = req.body

    const user = await User.findById(userId)
    if (!user || user.role !== "ESTUDIANTE") {
      return res.status(400).json({ message: "El usuario no es un estudiante válido" })
    }

    const tutorExists = await Tutor.findOne({ user: userId })
    if (tutorExists) {
      return res.status(400).json({ message: "Este estudiante ya es tutor" })
    }

    const tutor = new Tutor({
      user: userId,
      grade,
      maxStudents,
      courses
    })

    user.role = "TUTOR"
    await user.save()
    await tutor.save()

    res.status(201).json({ message: "Tutor creado exitosamente", tutor })
  } catch (error) {
    res.status(500).json({ message: "Error al crear tutor", error: error.message })
  }
}

// Actualizar perfil del tutor (solo su propio perfil)
export const updateOwnTutorProfile = async (req, res) => {
  try {
    const { _id, role } = req.usuario
    if (role !== "TUTOR") {
      return res.status(403).json({ message: "No autorizado" })
    }

    const { maxStudents, visible, horarios } = req.body

    const tutor = await Tutor.findOne({ user: _id })
    if (!tutor) return res.status(404).json({ message: "Tutor no encontrado" })

    if (maxStudents !== undefined) tutor.maxStudents = maxStudents
    if (visible !== undefined) tutor.visible = visible
    if (horarios !== undefined) tutor.horarios = horarios

    await tutor.save()
    res.status(200).json({ message: "Perfil actualizado", tutor })
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar tutor", error: err.message })
  }
}

// Obtener tutores visibles por curso
export const getTutoresByCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const tutores = await Tutor.find({ visible: true, courses: courseId })
      .populate("user", "name email grade")
      .populate("courses", "name")
    res.status(200).json({ tutores })
  } catch (err) {
    res.status(500).json({ message: "Error al obtener tutores", error: err.message })
  }
}
