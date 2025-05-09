import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { getUsersForSideBar ,getMessages,sendMessage,deleteSingleMsg,deleteAllMsgs} from "../controllers/message.controller.js";
const router = express.Router({mergeParams:true});



router.get("/users",authenticateUser,getUsersForSideBar);

router.get("/:id",authenticateUser,getMessages); // get messages between two users
router.delete("/:msgId",authenticateUser,deleteSingleMsg);
router.delete("/all/:receiverId",authenticateUser,deleteAllMsgs);

router.post("/send/:id",authenticateUser,sendMessage); // send message to a user
export default router;