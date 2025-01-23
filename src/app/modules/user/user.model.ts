import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String },
    resetToken: { type: String },
  
    role: { type: String, enum: ["admin", "user"], default: "user" },
    address: { type: String },
    image: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.password && this.isModified("password")) {
    try {
      user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
      );
    } catch (error: any) {
      return next(error);
    }
  }

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = model<TUser>("User", userSchema);
