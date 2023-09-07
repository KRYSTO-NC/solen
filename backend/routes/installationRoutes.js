import express from 'express'

const router = express.Router({ mergeParams: true })
import {
  getInstallationById,
  getInstallations,
  createInstallation,
  deleteInstallation,
  updateInstallation,
 
} from '../controllers/installationController.js'

// incude other resource routers
import interventionRouter from './interventionRoutes.js';
import contractRouter from './contractRoutes.js';


// Re-route into other resource routers
router.use('/:installationId/interventions', interventionRouter)
router.use('/:installationId/contracts', contractRouter)


import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router.route('/').get(getInstallations).post(protect, createInstallation)

router

  .route('/:id')
  .get(checkObjectId, getInstallationById)
  .put(protect, checkObjectId, updateInstallation)
  .delete(protect, admin, checkObjectId, deleteInstallation)

export default router
