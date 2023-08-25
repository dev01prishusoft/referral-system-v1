import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    nftId: {
      type: String,
      unique: true,
      required: true,
    },
    referralLink: {
      type: String,
      unique: true,
      required: true,
    },
    referralCode: {
      type: String,
      unique: true,
      required: true,
    },
    totalEarnings: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

// We are compiling our "Schema" into a "Model"
const Referral = mongoose.model("Referral", ReferralSchema);

export {
  Referral
};