import mongoose, { Document, Schema } from "mongoose";
import { leaveType } from "../enums/leaveType.enum";
import { leaveStages } from "../enums/leaveStages.enum";
import { userStatus } from "../enums/userStatus.enum";

export interface ILeaveRequest extends Document {
  requestId: string; // unique key
  user: mongoose.Types.ObjectId; // ref User
  startDate: Date;
  endDate: Date;
  numberOfHours?: number;

  type: leaveType;
  stage: leaveStages;
  status: userStatus;

  reason?: string;
  note?: string;

  approvedBy?: string; // name or ID string
  approvedId?: mongoose.Types.ObjectId; // ref User
  approvedAt?: Date;

  createdBy?: string;
  updatedBy?: string;

  createdAt: Date;
  updatedAt: Date;
}

const LeaveRequestSchema = new Schema<ILeaveRequest>(
  {
    requestId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    numberOfHours: {
      type: Number,
    },

    type: {
      type: String,
      enum: Object.values(leaveType),
      required: true,
    },

    stage: {
      type: String,
      enum: Object.values(leaveStages),
      default: leaveStages.REQUESTED,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(userStatus),
      default: userStatus.ACTIVE,
      required: true,
    },

    reason: {
      type: String,
      trim: true,
    },

    note: {
      type: String,
      trim: true,
    },

    approvedBy: {
      type: String,
      trim: true,
    },

    approvedId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: {
      type: Date,
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

export default mongoose.model<ILeaveRequest>("LeaveRequest", LeaveRequestSchema);
