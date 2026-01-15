// leaveBalance.services.ts
import * as leaveBalanceRepository from "../repositories/leaveBalance.repository";
import User from "../models/User";
import { userStatus } from "../enums/userStatus.enum";

export const createLeaveBalanceService = async (payload: any) => {
  const { userId, year, leaves } = payload;

  if (!userId || !year || !leaves) throw new Error("Missing required fields");

  const existingUser = await User.findOne({ userId, status: userStatus.ACTIVE });
  if (!existingUser) throw new Error("User not found");

  const existingBalance = await leaveBalanceRepository.findLeaveBalanceByUser(userId);
  if (existingBalance && existingBalance.year === year)
    throw new Error("Leave Balance already exists for this year");

  return leaveBalanceRepository.createLeaveBalance({
    ...payload,
    balanceId: `LB-${Date.now()}`,
    user: userId,
    year,
    leaves,
    status: userStatus.ACTIVE,
  });
};

export const getAllLeaveBalanceService = () => {
  return leaveBalanceRepository.findAllLeaveBalance();
};

export const getLeaveBalanceByUserService = (userId: string) => {
  return leaveBalanceRepository.findLeaveBalanceByUser(userId);
};

export const updatedLeaveBalanceByUserService = (balanceId: string, data: any) => {
  return leaveBalanceRepository.updateLeaveBalanceByUser(balanceId, data);
};

export const deletedLeaveBalanceByUserService = (balanceId: string) => {
  return leaveBalanceRepository.deleteLeaveBalanceByUser(balanceId);
};
