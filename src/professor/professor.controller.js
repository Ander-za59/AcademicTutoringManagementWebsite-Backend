import Professor from "./professor.model.js"
import Student from "../student/student.model.js"
import Tutor from "../tutor/tutor.model.js"
import Note from "../note/note.model.js"
import User from "../user/user.model.js"

// Obtener estudiantes de sus cursos
export const getStudentsByCourse = async (req, res) => {
  try {
    const professor = await Professor.findOne({ user: req.usuario._id })
    const students = await Student.find({}).populate("user")

    const filtered = students.filter(s => {
      return s.appliedTutors.some(a =>
        professor.courses.some(c => c.toString() === a.course.toString())
      )
    })

    res.status(200).json({ students: filtered })
  } catch (err) {
    res.status(500).json({ message: "Error al obtener estudiantes", error: err.message })
  }
}

// Convertir estudiante en tutor
export const promoteToTutor = async (req, res) => {
  try {
    const { studentUserId } = req.body

    const user = await User.findById(studentUserId)
    if (!user || user.role !== "ESTUDIANTE") {
      return res.status(404).json({ message: "Usuario no válido para tutoría" })
    }

    user.role = "TUTOR"
    await user.save()

    const tutor = new Tutor({ user: user._id, availableSlots: 5, visible: false })
    await tutor.save()

    res.status(200).json({ message: "Estudiante promovido a tutor", tutor })
  } catch (err) {
    res.status(500).json({ message: "Error al promover a tutor", error: err.message })
  }
}

// Quitar tutoría a un usuario
export const removeTutor = async (req, res) => {
  try {
    const { tutorUserId } = req.params

    const user = await User.findById(tutorUserId)
    if (!user || user.role !== "TUTOR") {
      return res.status(404).json({ message: "Usuario no es un tutor válido" })
    }

    const tutor = await Tutor.findOne({ user: tutorUserId })
    if (!tutor) {
      return res.status(404).json({ message: "Tutor no encontrado" })
    }

    // Lógica: eliminar tutor y revertir el rol
    await Tutor.findByIdAndDelete(tutor._id)
    user.role = "ESTUDIANTE"
    await user.save()

    res.status(200).json({ message: "Tutor eliminado y regresado a estudiante" })
  } catch (err) {
    res.status(500).json({ message: "Error al remover tutor", error: err.message })
  }
}

// Ver notas del tutor
export const getTutorNotes = async (req, res) => {
  try {
    const { tutorId } = req.params
    const notes = await Note.find({ tutor: tutorId })

    res.status(200).json({ notes })
  } catch (err) {
    res.status(500).json({ message: "Error al obtener notas", error: err.message })
  }
}

// Editar notas del tutor
export const updateTutorNote = async (req, res) => {
  try {
    const { noteId } = req.params
    const { grade, bimester, score } = req.body

    const updated = await Note.findByIdAndUpdate(noteId, { grade, bimester, score }, { new: true })

    res.status(200).json({ message: "Nota actualizada", note: updated })
  } catch (err) {
    res.status(500).json({ message: "Error al editar nota", error: err.message })
  }
}
