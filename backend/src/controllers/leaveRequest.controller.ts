import { Request, Response } from "express";
import {
  applyLeaveService,
  getAllLeaveRequestsService,
  getLeaveByIdService,
  approveLeaveService,
  rejectLeaveService,
  deleteLeaveService,
} from "../services/leaveRequest.services";

import { errorResponse, successResponse } from "../utils/apiResponse";

// apply for leave
export const applyLeave = async (req: Request, res: Response) => {
  try {
    const leave = await applyLeaveService(req.body);
    return res
      .status(201)
      .json(successResponse("Leave request created", leave));
  } catch (error: any) {
    return res
      .status(400)
      .json(errorResponse(error.message, error));
  }
};

// get all leave requests
export const getAllLeaveRequest = async (req: Request, res: Response) => {
  try {
    const requests = await getAllLeaveRequestsService();
    return res
      .status(200)
      .json(successResponse("Fetched all leave requests", requests));
  } catch (error: any) {
    return res
      .status(500)
      .json(errorResponse("Failed to fetch leave requests", error));
  }
};

// get leave request by user
export const getLeaveRequestByUser = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const leave = await getLeaveByIdService(requestId);
    return res.status(200).json(successResponse("Leave request fetched", leave));
  } catch (error: any) {
    return res.status(404).json(errorResponse(error.message, error));
  }
};


// approve leave
export const approveLeave = async (req: Request, res: Response) => {
  try {
    const leave = await approveLeaveService(req.params.requestId, req.body);
    return res
      .status(200)
      .json(successResponse("Leave approved", leave));
  } catch (error: any) {
    return res
      .status(400)
      .json(errorResponse(error.message, error));
  }
};

// reject leave
export const rejectLeave = async (req: Request, res: Response) => {
  try {
    const leave = await rejectLeaveService(req.params.requestId, req.body.note);
    return res
      .status(200)
      .json(successResponse("Leave rejected", leave));
  } catch (error: any) {
    return res
      .status(400)
      .json(errorResponse("Failed to reject leave", error));
  }
};

// delete leave
export const deleteLeave = async (req: Request, res: Response) => {
  try {
    const leave = await deleteLeaveService(req.params.requestId);
    return res.status(200).json(successResponse("Leave has been deleted", leave));
  } catch (error: any) {
    return res.status(400).json(errorResponse(error.message, error));
  }
};
