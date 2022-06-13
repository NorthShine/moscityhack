import express from 'express';
import { getContent } from '../controllers';
const router = express.Router();

router.get('/parser/api/v1/', getContent);

export default router;
