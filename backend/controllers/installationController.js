import asyncHandler from '../middleware/asyncHandler.js'
import Installation from '../models/installationModel.js'
import MaintenanceContract from '../models/maintenanceContractModel.js'

// @desc Fetch all installations
// @route GET /api/installations
// @access Private
const getInstallations = asyncHandler(async (req, res) => {
  const pageSize = 16
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const count = await Installation.countDocuments({ ...keyword })
  const installations = await Installation.find({ ...keyword }).populate('interventions createdBy maintenanceContracts')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ installations, page, pages: Math.ceil(count / pageSize) })
})
// @desc Fetch single installation
// @route GET /api/installations/:id
// @access Private
const getInstallationById = asyncHandler(async (req, res) => {
  const installation = await Installation.findById(req.params.id)
    .populate('interventions createdBy'); // Populate only interventions and createdBy here
  
  if (installation) {
    // Find and populate maintenanceContracts separately
    const populatedContracts = await MaintenanceContract.find({ installationId: installation._id })
      .populate('options.optionId'); // populate options here
    
    installation.maintenanceContracts = populatedContracts;

    res.json(installation);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});



// @desc create installation
// @route POST /api/installations
// @access Private
const createInstallation = asyncHandler(async (req, res) => {
  const newInstallation = new Installation({
    createdBy: req.user._id,
    address: "Aucune adresse renseignée",
  })
  try {
    const createdInstallation = await newInstallation.save();
    console.log(createdInstallation);
    res.status(201).json(createdInstallation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'installation" });
  }
})

// @desc Update an installation
// @route PUT /api/installations
// @access Private
const updateInstallation = asyncHandler(async (req, res, next) => {
  const installation = await Installation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({
    success: true,
    data: installation,
  })
})


// @desc delete a installation
// @route DELETE /api/installations
// @access Private
const deleteInstallation = asyncHandler(async (req, res) => {
  const installation = await Installation.findById(req.params.id)
  if (installation) {
    await installation.deleteOne({ _id: installation._id })
    res.status(200).json({ message: 'Installation supprimé' })
  } else {
    res.status(404)
    throw new Error('Installation non trouvé')
  }
})


export {
  getInstallations,
  getInstallationById,
  createInstallation,
  deleteInstallation,
  updateInstallation

}
