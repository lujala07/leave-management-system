import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  userId: string;

  name: string;
  email: string;
  password: string;
  phoneNumber?: string;

  role: "EMPLOYEE" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "INACTIVE" | "DELETED";

  employmentStartDate?: Date;
  employmentEndDate?: Date;
  employmentType: "FULL_TIME" | "PART_TIME";

  department: "IT" | "MARKETING" | "HR";
  designation?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";

  profilePicture?: string;

  createdBy?: string;
  updatedBy?: string;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["EMPLOYEE", "ADMIN", "SUPER_ADMIN"],
      default: "EMPLOYEE",
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "DELETED"],
      default: "ACTIVE",
      required: true,
    },

    employmentStartDate: {
      type: Date,
    },

    employmentEndDate: {
      type: Date,
    },

    employmentType: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME"],
      required: true,
    },

    department: {
      type: String,
      enum: ["IT", "MARKETING", "HR"],
      required: true,
    },

    designation: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },

    profilePicture: {
      type: String,
    },

    createdBy: {
      type: String,
    },

    updatedBy: {
      type: String,
    },
  },
  { timestamps: true},
);


export default mongoose.model<IUser>("User", UserSchema);
