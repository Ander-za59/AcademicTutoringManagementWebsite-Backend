import { Schema, model } from "mongoose"

const horarioSchema = new Schema({
  dia: { type: String, required: true },
  hora: { type: String, required: true },
  lugar: { type: String, required: true },
  curso: { type: String, required: true },
  tipo: { type: String, required: true }
}, { _id: false })

const tutorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  grade: {
    type: Number,
    enum: [4, 5, 6],
    required: true
  },
  maxStudents: {
    type: Number,
    required: true,
    default: 5
  },
  visible: {
    type: Boolean,
    default: false
  },
  horarios: [horarioSchema],
  courses: [{
    type: Schema.Types.ObjectId,
    ref: "Course"
  }],
  students: [{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }]
}, {
  versionKey: false,
  timestamps: true
})

export default model("Tutor", tutorSchema)
