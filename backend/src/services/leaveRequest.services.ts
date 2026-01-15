import User from "../models/User";
import { leaveStages } from "../enums/leaveStages.enum";
import { userStatus } from "../enums/userStatus.enum";
import * as leaveRequestRepository  from "../repositories/leaveRequest.repository";

//create leave
export const applyLeaveService = async (payload: any) => {
  const{ userId, startDate, endDate, type, reason, numberOfHours }= payload;

  if (!userId || !startDate || !endDate || !type) {
    throw new Error("Missing required fields");
  }

  const existingUser = await User.findOne({ userId, status: userStatus.ACTIVE });
  if (!existingUser) {
    throw new Error("User not found");
  }

  return leaveRequestRepository.createLeaveRequest({
    user: existingUser._id,       
    startDate,
    endDate,
    type,
    reason,
    numberOfHours,
    requestId: `LR-${Date.now()}`,
    stage: leaveStages.REQUESTED,
    status: userStatus.ACTIVE,
    createdBy: existingUser._id, 
  });
};

//get all user
export const getAllLeaveRequestsService = () => {
  return leaveRequestRepository.findActiveLeaveRequests();
};

//get by id
export const getLeaveByIdService = async (requestId: string) => {
  const leave = await leaveRequestRepository.findLeaveByRequestId(requestId);
  if (!leave) throw new Error("Leave request not found");
  return leave;
};

//approve leave
export const approveLeaveService = async (requestId: string, data: any) => {
  const leave = await leaveRequestRepository.findLeaveByRequestId(requestId);
  if (!leave) throw new Error("Leave request not found");

  if (leave.stage !== leaveStages.REQUESTED) {
    throw new Error("Leave already processed");
  }

  leave.stage = leaveStages.APPROVED;
  leave.approvedBy = data.approvedBy;
  leave.approvedId = data.approvedId;
  leave.approvedAt = new Date();
  leave.note = data.note;

  return leaveRequestRepository.saveLeave(leave);
};

//reject leave
export const rejectLeaveService = async (requestId: string, note: string) => {
  const leave = await leaveRequestRepository.findLeaveByRequestId(requestId);
  if (!leave) throw new Error("Leave request not found");

  if (leave.stage !== leaveStages.REQUESTED) {
    throw new Error("Leave already processed");
  }

  leave.stage = leaveStages.REJECTED;
  leave.note = note;

  return leaveRequestRepository.saveLeave(leave);
};

//delete leave
export const deleteLeaveService = async (requestId: string) => {
  const leave = await leaveRequestRepository.findLeaveByRequestId(requestId);
  if (!leave) throw new Error("Leave request not found");

  if (leave.stage !== leaveStages.REQUESTED) {
    throw new Error("Leave already processed");
  }

  leave.status = userStatus.DELETED;
  return leaveRequestRepository.saveLeave(leave);
};

