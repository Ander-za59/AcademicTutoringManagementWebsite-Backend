import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    maxLength: 50
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"]
  },
  role: {
    type: String,
    enum: ["ADMIN", "ESTUDIANTE", "TUTOR", "PROFESOR"],
    default: "ESTUDIANTE"
  },
  emailVerificationCode: {
    type: String,
    required: true
  },
  codeExpiresAt: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  versionKey: false,
  timestamps: true
});

UserSchema.methods.toJSON = function () {
  const { password, emailVerificationCode, ...user } = this.toObject();
  user.uid = user._id;
  return user;
}

export default model("User", UserSchema);
