import Session from "./session.model.js"

export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ tutor: req.usuario._id }).populate("course")
    res.status(200).json({ sessions })
  } catch (err) {
    res.status(500).json({ message: "Error al obtener sesiones", error: err.message })
  }
}

export const createSession = async (req, res) => {
  try {
    const { day, time, place, course, type, link } = req.body

    const session = new Session({
      tutor: req.usuario._id,
      day,
      time,
      place,
      course,
      type,
      link
    })

    await session.save()
    res.status(201).json({ message: "Sesión creada", session })
  } catch (err) {
    res.status(500).json({ message: "Error al crear sesión", error: err.message })
  }
}
