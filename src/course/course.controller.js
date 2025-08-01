import Course from "./course.model.js"

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ active: true })
    res.status(200).json({ courses })
  } catch (err) {
    res.status(500).json({ message: "Error al obtener cursos", error: err.message })
  }
}

export const createCourse = async (req, res) => {
  try {
    const { name, description } = req.body
    const exists = await Course.findOne({ name })
    if (exists) return res.status(400).json({ message: "Curso ya existe" })

    const course = new Course({ name, description })
    await course.save()

    res.status(201).json({ message: "Curso creado", course })
  } catch (err) {
    res.status(500).json({ message: "Error al crear curso", error: err.message })
  }
}
