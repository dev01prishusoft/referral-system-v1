import { getItemCustom, createItem, updateItem } from '../../core/core.js';
import { Referral } from '../../models/referral.js';
import { UsedReferral } from '../../models/usedReferral.js';
import { v4 as uuidv4 } from "uuid";

const generate = async (req, res) => {

  if (!req.body.nftId || !req.body.userId) {
    return res.status(400).json({
      success: false,
      message: "Missing NFT ID Or User ID"
    });
  }
  const checkIfUserHasAlreadyGeneratedReferral = await getItemCustom(Referral, {
    userId: req.body.userId
  }, '_id');

  if (checkIfUserHasAlreadyGeneratedReferral) {
    return res.status(422).json({
      success: false,
      message: "Referral has already been created"
    });
  }

  const checkIfNftAlreadyExists = await getItemCustom(Referral, {
    nftId: req.body.nftId
  }, '_id');

  if (checkIfNftAlreadyExists) {
    return res.status(422).json({
      success: false,
      message: "NFT ID is already being used by another user"
    });
  }

  // Generate a new unique referral code
  const referralCode = uuidv4();

  const newReferral = await createItem(Referral, {
    userId: req.body.userId,
    nftId: req.body.nftId,
    referralLink: `http://localhost:${process.env.SERVER_PORT}/refer?code=${referralCode}`,
    referralCode
  });

  return res.status(200).json(newReferral);
};

const useCode = async (req, res) => {

  if (!req.body.userId || !req.body.referralCode) {
    return res.status(400).json({
      success: false,
      message: "Missing User ID OR Referral Code"
    });
  }

  const owner = JSON.parse(JSON.stringify(await getItemCustom(Referral, {
    referralCode: req.body.referralCode
  }, 'userId')));

  if (!owner) {
    return res.status(422).json({
      success: false,
      message: "Invalid Referral Code"
    });
  }

  if (owner.userId == req.body.userId) {
    return res.status(422).json({
      success: false,
      message: "Referral Cannot be used by owner."
    });
  }

  // const user = JSON.parse(JSON.stringify(await getItemCustom(User, {
  //   userId: new mongoose.Types.ObjectId(req.body.userId)
  // }, '_id')));

  // if (!user) {
  //   return res.status(422).json({
  //     success: false,
  //     message: "Invalid User ID"
  //   });
  // }

  const checkIfCodeAlreadyUsed = await getItemCustom(UsedReferral, {
    userId: req.body.userId,
    referralCode: req.body.referralCode
  }, '_id');

  if (checkIfCodeAlreadyUsed) {
    return res.status(422).json({
      success: false,
      message: "You have already used the referral"
    });
  }

  // all of create used referral and increment earning;

  await createItem(UsedReferral, {
    userId: req.body.userId,
    referralCode: req.body.referralCode,
    ownerId: owner.userId
  });

  await updateItem(Referral, {
    userId: owner.userId
  }, {
    $inc: {
      totalEarnings: 1
    }
  });

  return res.status(200).json({
    success: true,
    message: "Referral Applied Successfully"
  });
};

const getEarnings = async (req, res) => {
  const user = JSON.parse(JSON.stringify(await getItemCustom(Referral, {
    userId: req.params.userId
  }, '_id totalEarnings')));

  if (!user) {
    return res.status(422).json({
      success: false,
      message: "Invalid User ID"
    });
  }

  return res.status(200).json({
    totalEarnings: user.totalEarnings
  });
};

const getNFT = async (req, res) => {
  const user = await getItemCustom(Referral, {
    userId: req.params.userId
  });

  if (!user) {
    return res.status(422).json({
      success: false,
      message: "Invalid User ID"
    });
  }

  return res.status(200).json(user);
};

export {
  generate,
  useCode,
  getEarnings,
  getNFT
};