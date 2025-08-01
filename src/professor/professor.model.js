import { Schema, model } from "mongoose"

const professorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: "Course"
  }]
}, {
  versionKey: false,
  timestamps: true
})

export default model("Professor", professorSchema)
