import { Router } from "express";
import {
  createLeaveBalance,
  getAllLeaveBalances,
  getLeaveBalanceByUser,
  updateLeaveBalance,
  deactivateLeaveBalance,
} from "../controllers/leaveBalance.controller";

const router= Router();

router.post("/",createLeaveBalance);
router.get("/",getAllLeaveBalances);
router.get("/user/:userId",getLeaveBalanceByUser);
router.put("/:id", updateLeaveBalance);
router.put("/:id/deactivate",deactivateLeaveBalance);

export default router; 