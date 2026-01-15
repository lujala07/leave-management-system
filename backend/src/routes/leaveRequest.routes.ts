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
router.get("/users/:requestId", getLeaveRequestByUser); 

router.put("/approve/:requestId", approveLeave);
router.put("/reject/:requestId", rejectLeave);
router.delete("/:requestId",deleteLeave);

export default router;
