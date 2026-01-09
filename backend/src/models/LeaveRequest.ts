import mongoose, { Document, Schema } from "mongoose";

export interface ILeaveRequest extends Document {
  requestId: string; // unique key
  user: mongoose.Types.ObjectId; // ref User
  startDate: Date;
  endDate: Date;
  numberOfHours?: number;

  leaveType: "PTO" | "UTO" | "SICK" | "CASUAL";
  stage: "REQUESTED" | "APPROVED" | "REJECTED";
  status: "ACTIVE" | "INACTIVE" | "DELETED";

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

    leaveType: {
      type: String,
      enum: ["PTO", "UTO", "SICK", "CASUAL"],
      required: true,
    },

    stage: {
      type: String,
      enum: ["REQUESTED", "APPROVED", "REJECTED"],
      default: "REQUESTED",
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "DELETED"],
      default: "ACTIVE",
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
