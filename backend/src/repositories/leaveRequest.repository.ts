import LeaveRequest from "../models/LeaveRequest";

export const createLeaveRequest = (data: any) => {
  return LeaveRequest.create(data);
};

export const findActiveLeaveRequests = () => {
  return LeaveRequest.find({ status: "ACTIVE" })
    .populate("user", "name email role")
    .sort({ createdAt: -1 });
};

export const findLeaveByRequestId = (requestId: string) => {
  return LeaveRequest.findOne({ requestId });
};

export const saveLeave=(leave:any)=>{
    return leave.save();
};

