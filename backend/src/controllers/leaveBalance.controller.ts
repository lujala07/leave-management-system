import { Request, Response } from "express";
import LeaveBalance from "../models/LeaveBalance";
import User from "../models/User";

export const createLeaveBalance = async (req: Request, res: Response) => {
  try {
    const { user, year, leaves } = req.body;
    if (!user || !year || !leaves) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingBalance = await LeaveBalance.findOne({ user, year });
    if (existingBalance) {
      return res
        .status(400)
        .json({ message: "Leave Balance already exists of this year" });
    }
    const balance = await LeaveBalance.create({
      user,
      year,
      leaves,
      status: "ACTIVE",
    });
    res.status(201).json({ message: "Leave Balance created", balance });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create", error });
  }
};

// get all leave balances (admin)
export const getAllLeaveBalances = async (req: Request, res: Response) => {
  try {
    const balances = await LeaveBalance.find({ status: "ACTIVE" })
      .populate("user", "name email role department")
      .sort({ year: -1 });

    res.status(200).json({
      message: "Leave balances fetched",
      balances,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leave balances",
      error,
    });
  }
};

//get leave balance by user
export const getLeaveBalanceByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const year = new Date().getFullYear();
    const balance = await LeaveBalance.findOne({
      user: userId,
      year,
      status: "ACTIVE",
    }).populate("user", "name email role");

    if (!balance) {
      return res.status(404).json({ message: "Leave Balance not found" });
    }
    res.status(200).json({ message: "Leave balance fetched", balance });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch leave balance", error });
  }
};

//update leave balance
export const updateLeaveBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { leaves, status } = req.body;

    const balance = await LeaveBalance.findById(id);
    if (!balance) {
      return res.status(404).json({ message: "Leave balance not found" });
    }

    if (leaves) balance.leaves = leaves;
    if (status) balance.status = status;

    await balance.save();

    res.status(200).json({
      message: "Leave balance updated",
      balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update leave balance", error });
  }
};

// deactivate leave balance
export const deactivateLeaveBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const balance = await LeaveBalance.findById(id);

    if (!balance) {
      return res.status(404).json({ message: "Leave balance not found" });
    }
    balance.status = "INACTIVE";
    await balance.save();

    res.status(200).json({ message: "Leave balance deactivated", balance });
  } catch (error) {
    res.status(500).json({ message: "Failed to deactivate", error });
  }
};
