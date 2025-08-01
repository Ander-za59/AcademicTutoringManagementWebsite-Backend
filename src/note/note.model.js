import { Schema, model } from "mongoose"

const courseNoteSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, { _id: false })

const bimestreSchema = new Schema({
  bimestre: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true
  },
  courses: [courseNoteSchema]
}, { _id: false })

const gradeSchema = new Schema({
  grade: {
    type: Number,
    enum: [4, 5, 6],
    required: true
  },
  bimestres: [bimestreSchema]
}, { _id: false })

const noteSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  grades: [gradeSchema]
}, {
  versionKey: false,
  timestamps: true
})

export default model("Note", noteSchema)
