import LeaveBalance from "../models/LeaveBalance";

export const createLeaveBalance= (data:any)=>{
    return LeaveBalance.create(data);
};

export const findAllLeaveBalance = ()=>{
    return LeaveBalance.find({status:"ACTIVE"})
      .populate("user", "name email role department")
      .sort({ year: -1 });
};

export const findLeaveBalanceByUser = (balanceId: string)=>{
    return LeaveBalance.findOne({user: balanceId, status: "ACTIVE"})
    .sort({createdAt:-1});
};

export const updateLeaveBalanceByUser =(balanceId: string, data:any)=>{
    return LeaveBalance.findOneAndUpdate({ user: balanceId, status:"ACTIVE" }, data, { new: true });
};

export const deleteLeaveBalanceByUser= (balanceId: string)=>{
    return LeaveBalance.findOneAndUpdate({user: balanceId, status:"ACTIVE"}, {status:"DELETED"}, {new:true});
};