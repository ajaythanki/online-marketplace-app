const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    notificationType: String,
    content: {
      type: String,
      required: [true, "Notification content is required."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);