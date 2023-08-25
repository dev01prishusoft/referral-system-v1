/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
// import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { initMongo } from './config/mongo.js';
import { referralRoutes } from './app/routes/nft.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Define the port number
const port = process.env.SERVER_PORT || 5000;

// Connect to MongoDB.
// await mongoose.connect(process.env.ATLAS_URI);

// Create the referral Schema
// const referralSchema = new mongoose.Schema({
// 	userId: { type: String, required: true },
// 	referralLink: { type: String, unique: true },
// 	createdAt: { type: Date, default: Date.now() }
// });
// // We are compiling our "Schema" into a "Model"
// const Referral = mongoose.model("Referral", referralSchema);

// Build the create route
// app.post("/create", async (req, res) => {
// 	// Get  the user ID form the request body
// 	console.log("req.body is 👉", req.body);

// 	const userId = req.body.userId;

// 	// Generate a new unique referral code
// 	const referralCode = uuidv4();

// 	// Create a new referral "Record" from the "Model"
// 	const newReferral = new Referral({
// 		userId,
// 		referralLink: `http://localhost:${port}/refer?code=${referralCode}`
// 	});

// 	// Save the new referral record
// 	await newReferral.save();

// 	// Return the  referral code to the client
// 	res.json({ referralCode });
// });

// const referralData = await Referral.find();
// console.log(`DB data is : ${referralData}`);
app.use('/', referralRoutes);
app.listen(port, () => {
	console.log(`Referral system listening on port ${port}`);
});

// Init MongoDB
initMongo();
