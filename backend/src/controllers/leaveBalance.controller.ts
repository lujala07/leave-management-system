   
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/apiResponse";
import {
  createLeaveBalanceService,
  getAllLeaveBalanceService,
  getLeaveBalanceByUserService,
  updatedLeaveBalanceByUserService,
  deletedLeaveBalanceByUserService,
} from "../services/leaveBalance.services";

// CREATE
export const createLeaveBalance = async (req: Request, res: Response) => {
  try {
    const leaveBalance = await createLeaveBalanceService(req.body);
    return res.status(201).json(successResponse("Leave balance created", leaveBalance));
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message));
  }
};

// GET ALL
export const getAllLeaveBalances = async (req: Request, res: Response) => {
  try {
    const allBalance = await getAllLeaveBalanceService();
    return res.status(200).json(successResponse("All leave balances fetched", allBalance));
  } catch (error: any) {
    return res.status(500).json(errorResponse(error.message));
  }
};

// GET BY USER
export const getLeaveBalanceByUser = async (req: Request, res: Response) => {
  try {
    const balance = await getLeaveBalanceByUserService(req.params.userId);
    return res.status(200).json(successResponse("Leave balances for user fetched", balance));
  } catch (error: any) {
    return res.status(404).json(errorResponse(error.message));
  }
};

// UPDATE
export const updateLeaveBalance = async (req: Request, res: Response) => {
  try {
    const updated = await updatedLeaveBalanceByUserService(req.params.balanceId, req.body);
    return res.status(200).json(successResponse("Leave balance updated", updated));
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message));
  }
};

// DEACTIVATE
export const deleteLeaveBalance = async (req: Request, res: Response) => {
  try {
    const deleted = await deletedLeaveBalanceByUserService(req.params.balanceId);
    return res.status(200).json(successResponse("Leave balance deleted", deleted));
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message));
  }
};
