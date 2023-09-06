import express from 'express'

const router = express.Router()
import {
  getInstallationById,
  getInstallations,
  
  createInstallation,
  deleteInstallation,
  updateInstallation,
 
} from '../controllers/installationController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router.route('/').get(getInstallations).post(protect, createInstallation)

router

  .route('/:id')
  .get(checkObjectId, getInstallationById)
  .put(protect, checkObjectId, updateInstallation)
  .delete(protect, admin, checkObjectId, deleteInstallation)

export default router
