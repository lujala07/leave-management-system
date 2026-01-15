import mongoose, { Document, Schema } from "mongoose";
import { leaveType } from "../enums/leaveType.enum";
import { userStatus } from "../enums/userStatus.enum";

export interface ILeaveItem {
  type: leaveType;
  totalDays: number;
  totalHours: number;
  usedDays: number;
  usedHours: number;
  remainingDays: number;
  remainingHours: number;
}

export interface ILeaveBalance extends Document {
  balanceId: string;
  user: string;
  locked: number;
  year: number;
  note?: string;
  status: userStatus;
  leaves: ILeaveItem[];
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeaveItemSchema = new Schema<ILeaveItem>(
  {
    type: {
      type: String,
      enum: Object.values(leaveType),
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
      default: 0,
    },
    totalHours: {
      type: Number,
      required: true,
      default: 0,
    },
    remainingDays: {
      type: Number,
      required: true,
      default: 0,
    },
    remainingHours: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false } // prevent auto _id for sub-documents
);

const LeaveBalanceSchema = new Schema<ILeaveBalance>(
  {
    balanceId: { 
      type: String, 
      required: true, 
      unique: true },
      
    user: {
      type: String,
      required: true,
    },

    locked: {
      type: Number,
      default: 0,
    },

    year: {
      type: Number,
      required: true,
    },

    note: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(userStatus),
      default: userStatus.ACTIVE,
      required: true,
    },

    leaves: {
      type: [LeaveItemSchema],
      default: [],
    },

    createdBy: {
      type: String,
      trim: true,
    },

    updatedBy: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILeaveBalance>(
  "LeaveBalance",
  LeaveBalanceSchema
);
