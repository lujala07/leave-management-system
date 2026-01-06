import mongoose, { Document, Schema } from "mongoose";

export interface ILeaveItem {
  type: "PTO" | "UTO" | "SICK";
  totalDays: number;
  totalHours: number;
  remainingDays: number;
  remainingHours: number;
}

export interface ILeaveBalance extends Document {
  user: mongoose.Types.ObjectId;
  locked: number;
  year: number;
  note?: string;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
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
      enum: ["PTO", "UTO", "SICK"],
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
  { _id: false } // prevent auto _id for subdocuments
);

const LeaveBalanceSchema = new Schema<ILeaveBalance>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
      enum: ["ACTIVE", "INACTIVE", "DELETED"],
      default: "ACTIVE",
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

export default mongoose.model<ILeaveBalance>("LeaveBalance", LeaveBalanceSchema);
