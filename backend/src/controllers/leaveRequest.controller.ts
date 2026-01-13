import { Request, Response } from "express";
import LeaveRequest from "../models/LeaveRequest";
import User from "../models/User";

// apply for leave
export const applyLeave = async (req: Request, res: Response) => {
  try {
    const { requestId,user, startDate, endDate, type, reason, numberOfHours } = req.body;
    if (!user || !startDate || !endDate || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //check user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const leaveRequest = await LeaveRequest.create({
      requestId : `LR-${Date.now()}`,
      user,
      startDate,
      endDate,
      type,
      numberOfHours,
      reason,
      stage: "REQUESTED",
      status: "ACTIVE",
      createdBy: user,
    });

    return res
      .status(201)
      .json({ message: "Leave request created", leaveRequest });
  } catch (error) {
    return res.status(500).json({ message: "Failed to apply", error });
  }
};

// get all leave requests
export const getAllLeaveRequest = async (req: Request, res: Response) => {
  try {
    const requests = await LeaveRequest.find({ status: "ACTIVE" })
      .populate("user", "name email role")
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Fetched all leave request", requests });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch leave requests", error });
  }
};

// get leave request
export const getLeaveRequestByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const requests = await LeaveRequest.find({
      user: userId,
      status: "ACTIVE",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "User leave requests fetched",
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user leave requests",
      error,
    });
  }
};

// approve leave
export const approveLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { approvedBy, approvedId, note } = req.body;

    const leave = await LeaveRequest.findById(id);
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    if (leave.stage !== "REQUESTED") {
      return res
        .status(400)
        .json({ message: "Leave has already been processed" });
    }
    leave.stage = "APPROVED";
    leave.approvedBy = approvedBy;
    leave.approvedId = approvedId;
    leave.approvedAt = new Date();
    leave.note = note;

    await leave.save();

    return res.status(200).json({ message: "Leave approved", leave });
  } catch (error) {
    return res.status(500).json({ message: "Failed to approve", error });
  }
};

//reject leave
export const rejectLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const leave = await LeaveRequest.findById(id);

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    if (leave.stage !== "REQUESTED") {
      return res
        .status(400)
        .json({ message: "Leave has already been processed" });
    }
    leave.stage = "REJECTED";
    leave.note = note;

    await leave.save();

    return res.status(200).json({ message: "Leave rejected", leave });
  } catch (error) {
    return res.status(500).json({ message: "Failed to reject", error });
  }
};

//delete leave
export const deleteLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leave = await LeaveRequest.findById(id);

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    if (leave.stage !== "REQUESTED") {
      return res
        .status(400)
        .json({ message: "Leave has already been processed" });
    }
    leave.status = "DELETED";

    await leave.save();

    return res.status(200).json({ message: "Leave has been deleted", leave });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete leave", error });
  }
};
