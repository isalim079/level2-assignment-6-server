import { Schema, model } from "mongoose";
import { TFollowerInfo, TSubscriptionInfo, TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const subscriptionInfoSchema = new Schema<TSubscriptionInfo>({
  tnxId: { type: String },
  purchaseTime: { type: String },
  expiryTime: { type: String },
  amount: { type: Number },
})

const followerInfoSchema = new Schema<TFollowerInfo>({
  following: {type: Boolean},
  name: {type: String},
  email: {type: String},
  image: {type: String},
});

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
  
    role: { type: String, enum: ["admin", "user"], default: "user" },
    address: { type: String },
    totalSpends: { type: Number, default: 0 },
    subScriptionInfo: { type: [subscriptionInfoSchema]},
    followers: { type: [followerInfoSchema]},
    userType: { type: String, enum: ["free", "premium"], default: "free" },
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
