import { Router } from "express";
import {
  createLeaveBalance,
  getAllLeaveBalances,
  getLeaveBalanceByUser,
  updateLeaveBalance,
  deleteLeaveBalance,
} from "../controllers/leaveBalance.controller";

const router= Router();

router.post("/",createLeaveBalance);
router.get("/",getAllLeaveBalances);
router.get("/user/:balanceId",getLeaveBalanceByUser);
router.put("/:balanceId", updateLeaveBalance);
router.put("/delete/:balanceId",deleteLeaveBalance);

export default router; 