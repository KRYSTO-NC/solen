import express from 'express'

const router = express.Router({ mergeParams: true });
import {
    createNewInterventionForInstallation,
  getInterventionById,
  getInterventions,

 
} from '../controllers/interventionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router
.route('/').get(protect, getInterventions)
router.post('/', createNewInterventionForInstallation);
router
.route('/:id').get(checkObjectId, getInterventionById)

export default router
