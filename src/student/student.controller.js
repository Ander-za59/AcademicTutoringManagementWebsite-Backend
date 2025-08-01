import Student from "./student.model.js"
import Tutor from "../tutor/tutor.model.js"
import Course from "../course/course.model.js"

// Ver tutores disponibles por curso
export const getAvailableTutors = async (req, res) => {
  try {
    const { courseId } = req.params

    const tutors = await Tutor.find({
      courses: courseId,
      visible: true,
      availableSlots: { $gt: 0 }
    }).populate("user", "name email")

    res.status(200).json({ tutors })
  } catch (err) {
    res.status(500).json({ message: "Error al obtener tutores", error: err.message })
  }
}

// Aplicar a un tutor (solo uno por curso)
export const applyToTutor = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.usuario._id })
    const { courseId, tutorId } = req.body

    const alreadyApplied = student.appliedTutors.find(a => a.course.toString() === courseId)
    if (alreadyApplied) {
      return res.status(400).json({ message: "Ya estás inscrito en ese curso" })
    }

    const tutor = await Tutor.findById(tutorId)
    if (!tutor || !tutor.visible || tutor.availableSlots <= 0) {
      return res.status(400).json({ message: "Tutor no disponible" })
    }

    // Guardar la aplicación
    student.appliedTutors.push({ course: courseId, tutor: tutorId })
    tutor.availableSlots -= 1

    await student.save()
    await tutor.save()

    res.status(200).json({ message: "Aplicación enviada con éxito" })
  } catch (err) {
    res.status(500).json({ message: "Error al aplicar", error: err.message })
  }
}

// Ver tutorías activas del estudiante
export const getMyTutors = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.usuario._id }).populate({
      path: "appliedTutors.tutor",
      populate: { path: "user", select: "name email" }
    }).populate("appliedTutors.course", "name")

    res.status(200).json({ tutors: student.appliedTutors })
  } catch (err) {
    res.status(500).json({ message: "Error al obtener tus tutores", error: err.message })
  }
}

// Salirse de un grupo de tutoría
export const leaveTutor = async (req, res) => {
  try {
    const { courseId } = req.params
    const student = await Student.findOne({ user: req.usuario._id })

    const index = student.appliedTutors.findIndex(a => a.course.toString() === courseId)
    if (index === -1) {
      return res.status(404).json({ message: "No estás inscrito en ese curso" })
    }

    const tutorId = student.appliedTutors[index].tutor
    await Tutor.findByIdAndUpdate(tutorId, { $inc: { availableSlots: 1 } })

    student.appliedTutors.splice(index, 1)
    await student.save()

    res.status(200).json({ message: "Te has salido del grupo de tutoría" })
  } catch (err) {
    res.status(500).json({ message: "Error al salir del tutor", error: err.message })
  }
}
