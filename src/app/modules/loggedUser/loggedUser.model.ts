import mongoose, { Schema, Document } from "mongoose";

// Define the UserInfo schema
const UserInfoSchema: Schema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
   
  },
  email: {
    type: String,
   
  },
  image: {
    type: String,
    required: false,
  },
  role: {
    type: String,
 
  },
  address: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", // Optional: Auto-delete after 7 days
  },
});

// Define the interface for type safety
export interface IUserInfo extends Document {
  name: string;
  email: string;
  image?: string;
  role: string;
  address?: string;
  token: string;
}

// Create the model
const LoggedUserInfo = mongoose.model<IUserInfo>("LoggedUserInfo", UserInfoSchema);

export default LoggedUserInfo;
