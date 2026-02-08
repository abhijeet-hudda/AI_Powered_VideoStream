import { Router } from "express";
import {
  getMyNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJWT);

router.get("/", getMyNotifications);
router.get("/unread-count", getUnreadCount);
router.patch("/:notificationId/read", markNotificationAsRead);
router.patch("/read-all", markAllAsRead);
router.delete("/:notificationId", deleteNotification);

export default router;
