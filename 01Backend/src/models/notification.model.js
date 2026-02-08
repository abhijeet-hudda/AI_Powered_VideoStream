import mongoose,{Schema} from "mongoose";

const notificationSchema = new Schema({
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  sender:{
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  notificationtype: {
    type: String,
    enum: ["LIKE", "COMMENT", "REPLY", "SUBSCRIBE", "NEW_VIDEO"],
    required: true,
  },
  entityType: {
    type: String,
    enum: ["Video", "Comment", "Playlist"],
    required: true,
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
    index: true,
  },
},{timestamps:true})

export const Notification = mongoose.model("Notification",notificationSchema)



