import asyncHandler from '../middleware/asyncHandler.js'

import Installation from '../models/installationModel.js'
import Contract from '../models/maintenanceContractModel.js'

// @desc Fetch all contracts
// @route GET /api/contracts
// @access Private
const getContracts = asyncHandler(async (req, res) => {
    const contracts = await Contract.find({})
    .populate({
      path: 'options.optionId',
      model: 'Option'
    });
    if (contracts) {
      res.status(200).json(contracts);
    } else {
      res.status(404).json({ message: 'Aucun contrat trouvé' });
    }
  });

// @desc Fetch single contract
// @route GET /api/contracts/:id
// @access Private
const getContractById = asyncHandler(async (req, res) => {
    const contract = await Contract.findById(req.params.id).populate({
        path: 'options.optionId',
        model: 'Option'
      });

    if (contract) {
        res.json(contract)
    } else {
        res.status(404)
        throw new Error('Ressource not found')
    }
})

// @desc create new contract for specific installation
// @route POST /api/installations/:installationId/contracts
// @access Private
const createNewContractForInstallation = asyncHandler(async (req, res) => {
    console.log('req.params.installationId:', req.params.installationId);  // log for debugging
  
    // Check if installationId exists in the database
    const installation = await Installation.findById(req.params.installationId);
    if (!installation) {
      return res.status(404).json({ message: `Aucune installation trouvée avec l'id : ${req.params.installationId}` });
    }
  
    // Add installationId to req.body
    req.body.installationId = req.params.installationId;
  
    // Create the contract
    try {
      const newContract = new Contract(req.body);
      const savedContract = await newContract.save();
      
      res.status(201).json({
        success: true,
        data: savedContract,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la création du contrat" });
    }
  });
  



export {
    getContracts,
    getContractById,
    createNewContractForInstallation
  }
  