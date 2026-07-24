import { Subscription } from "../models/subscription.model.js";
import { Notification } from "../models/notification.model.js";
import { io } from "../index.js";
import {
    NOTIFICATION_TYPES,
    ENTITY_TYPES,
} from "../constants_folder/notification.constants.js";

const sendNotification = async ({
    receivers,
    sender,
    notificationtype,
    entityType,
    entityId,
    message,
    metadata = {},
}) => {

    if (!receivers?.length) return;

    const notificationDocs = receivers.map((receiver) => ({
        receiver,
        sender,
        notificationtype,
        entityType,
        entityId,
        message,
        metadata,
    }));

    const notifications = await Notification.insertMany(notificationDocs);

    notifications.forEach((notification) => {
        io.to(notification.receiver.toString()).emit("notification", {
            _id: notification._id,
            notificationtype: notification.notificationtype,
            message: notification.message,
            metadata: notification.metadata,
            entityId: notification.entityId,
            createdAt: notification.createdAt,
        });
    });
};

const notifyNewVideo = async (video, uploader) => {

    const subscribers = await Subscription.find({
        channel: video.owner,
    }).select("subscriber");

    const receivers = subscribers.map(
        (sub) => sub.subscriber
    );

    await sendNotification({
        receivers,
        sender: video.owner,
        notificationtype: NOTIFICATION_TYPES.NEW_VIDEO,
        entityType: ENTITY_TYPES.VIDEO,
        entityId: video._id,
        message: `${uploader.username} uploaded a new video`,
        metadata: {
            title: video.title,
            thumbnail: video.thumbnail,
        },
    });
};

export {
    sendNotification,
    notifyNewVideo,
};