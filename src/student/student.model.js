import { Schema, model } from "mongoose"

const studentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  grade: {
    type: String,
    enum: ["4to", "5to", "6to"],
    required: true
  },
  appliedTutors: [
    {
      course: { type: Schema.Types.ObjectId, ref: "Course" },
      tutor: { type: Schema.Types.ObjectId, ref: "Tutor" }
    }
  ]
}, {
  versionKey: false,
  timestamps: true
})

export default model("Student", studentSchema)
