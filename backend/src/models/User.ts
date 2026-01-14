import mongoose, { Document, Schema } from "mongoose";
import { userRole } from "../enums/userRole.enum";
import { userStatus } from "../enums/userStatus.enum";
import { employmentType } from "../enums/employmentType.enum";
import { departmentType } from "../enums/departmentType.enum";
import { genderType } from "../enums/genderType.enum";

export interface IUser extends Document {
  userId: string;

  name: string;
  email: string;
  password: string;
  phoneNumber?: string;

  role: userRole;
  status: userStatus;

  employmentStartDate?: Date;
  employmentEndDate?: Date;
  employmentType: employmentType;

  department: departmentType;
  designation?: string;
  gender?: genderType;

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
      enum: Object.values(userRole),
      default: userRole.EMPLOYEE,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(userStatus),
      default: userStatus.ACTIVE,
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
      enum: Object.values(employmentType),
      required: true,
    },

    department: {
      type: String,
      enum: Object.values(departmentType),
      required: true,
    },

    designation: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: Object.values(genderType),
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
