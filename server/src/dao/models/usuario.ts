import mongoose, { Document, Schema, Model } from "mongoose";

const userCollection = "User";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel: Model<IUser> = mongoose.model<IUser>(userCollection, userSchema);

export default UserModel;