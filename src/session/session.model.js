import { Schema, model } from "mongoose"

const SessionSchema = new Schema({
  tutor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  day: {
    type: String,
    enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    required: true
  },
  time: {
    type: String,
    required: true
  },
  place: {
    type: String,
    enum: ["Teams", "Zoom", "Google Meet", "Presencial"],
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  type: {
    type: String,
    enum: ["Repaso", "Dudas", "Revisión general"],
    required: true
  },
  link: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model("Session", SessionSchema)
