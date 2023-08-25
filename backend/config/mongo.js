/* eslint-disable no-undef */
import mongoose from "mongoose";
import { loadModels } from '../app/models/index.js';

const initMongo = () => {
  mongoose.connect(process.env.ATLAS_URI);
  const db = mongoose.connection;
  db.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  // Listen for the error event
  db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  // Listen for the disconnected event
  db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });
  loadModels();
};

export {
  initMongo
};