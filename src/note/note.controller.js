import Note from "./note.model.js"
import User from "../user/user.model.js"

// Obtener notas por estudiante autenticado (tutor o estudiante)
export const getOwnNotes = async (req, res) => {
  try {
    const { _id } = req.usuario
    const notas = await Note.findOne({ student: _id }).populate("grades.bimestres.courses.course")
    if (!notas) {
      return res.status(404).json({ message: "No se encontraron notas" })
    }
    res.status(200).json({ notas })
  } catch (err) {
    res.status(500).json({ message: "Error al obtener notas", error: err.message })
  }
}

// Registrar o actualizar notas por profesor
export const assignNote = async (req, res) => {
  try {
    const { studentId, grade, bimestre, courseId, score } = req.body

    let notas = await Note.findOne({ student: studentId })
    if (!notas) {
      notas = new Note({ student: studentId, grades: [] })
    }

    let grado = notas.grades.find(g => g.grade === grade)
    if (!grado) {
      grado = { grade, bimestres: [] }
      notas.grades.push(grado)
    }

    let bim = grado.bimestres.find(b => b.bimestre === bimestre)
    if (!bim) {
      bim = { bimestre, courses: [] }
      grado.bimestres.push(bim)
    }

    const existingCourse = bim.courses.find(c => c.course.toString() === courseId)
    if (existingCourse) {
      existingCourse.score = score
    } else {
      bim.courses.push({ course: courseId, score })
    }

    await notas.save()
    res.status(200).json({ message: "Nota asignada correctamente", notas })
  } catch (err) {
    res.status(500).json({ message: "Error al asignar nota", error: err.message })
  }
}
