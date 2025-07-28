import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: false, 
      minlength: [6, "Password should be at least 6 characters"],
    },
    provider: {
      type: String,
      required: true,
      default: "google",
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = models?.User || model("User", userSchema);
export default User;
