import { Router } from 'express';
import {
  generate,
  useCode,
  getEarnings,
  getNFT
} from '../controllers/nft/index.js';

export const referralRoutes = Router();

referralRoutes.post('/generate', generate);

referralRoutes.post('/useCode', useCode);

referralRoutes.get('/earnings/:userId', getEarnings);

referralRoutes.get('/nfts/:userId', getNFT);