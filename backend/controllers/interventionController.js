import asyncHandler from '../middleware/asyncHandler.js'
import Intervention from '../models/interventionModel.js'
import Installation from '../models/installationModel.js'

// @desc Fetch all interventions
// @route GET /api/interventions
// @access Private
const getInterventions = asyncHandler(async (req, res) => {
    res.status(200).json({})
})


// @desc Fetch single installation
// @route GET /api/installations/:id
// @access Private
const getInterventionById = asyncHandler(async (req, res) => {
    const intervention = await Intervention.findById(req.params.id)

    if (intervention) {
        res.json(intervention)
    } else {
        res.status(404)
        throw new Error('Ressource not found')
    }
})

// @desc create new intervention for specific installation
// @route POST /api/installations/:installationId/interventions
// @access Private
const createNewInterventionForInstallation = asyncHandler(async (req, res) => {
    console.log('req.params.installationId:', req.params.installationId);  // log for debugging

    // Check if installationId exists in the database
    const installation = await Installation.findById(req.params.installationId);
    if (!installation) {
        return res.status(404).json({ message: `Aucune installation trouvée avec l'id : ${req.params.installationId}` });
    }

    // Add installationId to req.body
    req.body.installationId = req.params.installationId;

   

    // Create the intervention
    try {
        const newIntervention = new Intervention(req.body);
        const savedIntervention = await newIntervention.save();
        
        res.status(201).json({
            success: true,
            data: savedIntervention,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'intervention" });
    }
});




export {
    getInterventions,
    getInterventionById,
    createNewInterventionForInstallation
  }
  