import { Schema, model } from "mongoose"

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  versionKey: false,
  timestamps: true
})

export default model("Course", CourseSchema)
