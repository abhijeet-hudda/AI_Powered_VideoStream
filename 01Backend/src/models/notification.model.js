// import mongoose,{Schema} from "mongoose";
// import {
//     NOTIFICATION_TYPES,
//     ENTITY_TYPES,
// } from "../constants_folder/notification.constants.js";

// const notificationSchema = new Schema({
//   receiver: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//     index: true,
//   },
//   sender:{
//     type: Schema.Types.ObjectId,
//     ref:"User"
//   },
//   notificationtype: {
//     type: String,
//     enum: Object.values(NOTIFICATION_TYPES),
//     required: true,
//   },
//   entityType: {
//     type: String,
//     enum: Object.values(ENTITY_TYPES),
//     required: true,
//   },
//   entityId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   isRead: {
//     type: Boolean,
//     default: false,
//     index: true,
//   },
// },{timestamps:true})

// export const Notification = mongoose.model("Notification",notificationSchema)



import mongoose, { Schema } from "mongoose";
import {
    NOTIFICATION_TYPES,
    ENTITY_TYPES,
} from "../constants_folder/notification.constants.js";


const notificationSchema = new Schema(
{
  receiver:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  notificationtype: {
    type: String,
    enum: Object.values(NOTIFICATION_TYPES),
    required: true,
  },

  entityType: {
    type: String,
    enum: Object.values(ENTITY_TYPES),
    required: true,
  },

  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  // Existing message (keep it)
  message: {
    type: String,
    required: true,
  },

  // New field for frontend
  metadata: {
    title: {
        type: String,
        default: "",
    },
    thumbnail: {
        type: String,
        default: "",
    },
  },

  isRead: {
    type: Boolean,
    default: false,
    index: true,
  },
},
{
  timestamps: true,
}
);

// Compound indexes (good for notification queries)
notificationSchema.index({ receiver: 1, createdAt: -1 });
notificationSchema.index({ receiver: 1, isRead: 1 });

export const Notification = mongoose.model(
    "Notification",
    notificationSchema
);



