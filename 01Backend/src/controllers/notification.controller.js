// controllers/notification.controller.js
import { Notification } from "../models/notification.model.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIErrors.js";

export const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    receiver: req.user._id,
  })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();
  console.log("cljdlfk j",notifications)
//    if(!notifications.length){
//     throw new ApiError(404,"No notifications found")
//    }
  return res.status(200).json(
    new ApiResponse(200, notifications, "Notifications fetched")
  );
});

export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({
    receiver: req.user._id,
    isRead: false,
  });

  return res.status(200).json(
    new ApiResponse(200, { count }, "Unread count fetched")
  );
});

export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  const notification = await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      receiver: req.user._id,
    },
    { isRead: true },
    { new: true }
  );

  return res.status(200).json(
    new ApiResponse(200, notification, "Notification marked as read")
  );
});

export const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { receiver: req.user._id, isRead: false },
    { isRead: true }
  );

  return res.status(200).json(
    new ApiResponse(200, {}, "All notifications marked as read")
  );
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  await Notification.deleteOne({
    _id: notificationId,
    receiver: req.user._id,
  });

  return res.status(200).json(
    new ApiResponse(200, {}, "Notification deleted")
  );
});
