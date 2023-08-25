import mongoose from "mongoose";

const UsedReferralSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    referralCode: {
      type: String,
      required: true
    },
    ownerId: {
      type: String,
      required: true
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
);

// We are compiling our "Schema" into a "Model"
const UsedReferral = mongoose.model("UsedReferral", UsedReferralSchema);

export {
  UsedReferral
};