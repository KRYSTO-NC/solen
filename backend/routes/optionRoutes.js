import express from 'express'

const router = express.Router({ mergeParams: true });
import {
  getOptions,

 
} from '../controllers/optionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router
.route('/').get( getOptions)



export default router
