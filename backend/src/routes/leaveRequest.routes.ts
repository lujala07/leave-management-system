import { Router } from "express";
import {
  applyLeave,
  getAllLeaveRequest,
  getLeaveRequestByUser,
  approveLeave,
  rejectLeave,
  deleteLeave,
} from "../controllers/leaveRequest.controller";

const router = Router();

router.post("/", applyLeave);
router.get("/", getAllLeaveRequest);
router.get("/user/:userId", getLeaveRequestByUser);

router.put("/:id/approve", approveLeave);
router.put("/:id/reject", rejectLeave);
router.delete("/:id",deleteLeave);

export default router;
