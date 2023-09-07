import express from 'express'

const router = express.Router({ mergeParams: true });
import {
    createNewInterventionForInstallation,
  getInterventions,

 
} from '../controllers/interventionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router
.route('/').get(protect, getInterventions)
router.post('/', createNewInterventionForInstallation);


export default router
