import express from 'express'

const router = express.Router({ mergeParams: true });
import { createNewContractForInstallation, getContracts } from '../controllers/maintenanceContractControllers.js';

import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router
.route('/').get(getContracts)
router.post('/', createNewContractForInstallation);


export default router
