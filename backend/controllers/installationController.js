import asyncHandler from '../middleware/asyncHandler.js'
import Installation from '../models/installationModel.js'

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
  const installations = await Installation.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ installations, page, pages: Math.ceil(count / pageSize) })
})

// @desc Fetch single installation
// @route GET /api/installations/:id
// @access Private
const getInstallationById = asyncHandler(async (req, res) => {
  const installation = await Installation.findById(req.params.id)

  if (installation) {
    res.json(installation)
  } else {
    res.status(404)
    throw new Error('Ressource not found')
  }
})

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
// const updateInstallation = asyncHandler(async (req, res) => {
//   const { 
//     activeMaintenanceContract,
//     typeInstallation,
//     status,
//     demandeur,
//     benneficiaire,
//     concessionaire,
//     numCompteurEnercal,
//     address,
//     numClientEnercal,
//     datePose,
//     datePrevisionelMiseEnService,
//     dateMiseEnService,
//     garantie,
//     demandeEEC,
//     demandeEnercal,
//     demandeDimenc,
//     conformite,
//     puissanceSouscrite,
//     puissanceTotalOnduleur,
//     puissancePvEtHybrid,
//     valeurBridagePuissance,
//     valeurBridageReinjection,
//     stockage,
//     capaciteBatterie,
//     onduleurs,
//     systemeDeSupportage,
//     batteries
//   } = req.body;

//   const installation = await Installation.findById(req.params.id);

//   if (installation) {
//     // Update fields
//     installation.activeMaintenanceContract = activeMaintenanceContract || installation.activeMaintenanceContract;
//     installation.typeInstallation = typeInstallation || installation.typeInstallation;
//     installation.status = status || installation.status;
//     installation.demandeur = demandeur || installation.demandeur;
//     installation.benneficiaire = benneficiaire || installation.benneficiaire;
//     installation.concessionaire = concessionaire || installation.concessionaire;
//     installation.numCompteurEnercal = numCompteurEnercal || installation.numCompteurEnercal;
//     installation.address = address || installation.address;
//     installation.numClientEnercal = numClientEnercal || installation.numClientEnercal;
//     installation.datePose = datePose || installation.datePose;
//     installation.datePrevisionelMiseEnService = datePrevisionelMiseEnService || installation.datePrevisionelMiseEnService;
//     installation.dateMiseEnService = dateMiseEnService || installation.dateMiseEnService;
//     installation.garantie = garantie || installation.garantie;
//     installation.garantie.isActive = garantie || installation.garantie.isActive;
  
//     installation.demandeEEC = demandeEEC || installation.demandeEEC;
//     installation.demandeEnercal = demandeEnercal || installation.demandeEnercal;
//     installation.demandeDimenc = demandeDimenc || installation.demandeDimenc;
//     installation.conformite = conformite || installation.conformite;
//     installation.puissanceSouscrite = puissanceSouscrite || installation.puissanceSouscrite;
//     installation.puissanceTotalOnduleur = puissanceTotalOnduleur || installation.puissanceTotalOnduleur;
//     installation.puissancePvEtHybrid = puissancePvEtHybrid || installation.puissancePvEtHybrid;
//     installation.valeurBridagePuissance = valeurBridagePuissance || installation.valeurBridagePuissance;
//     installation.valeurBridageReinjection = valeurBridageReinjection || installation.valeurBridageReinjection;
//     installation.stockage = stockage || installation.stockage;
//     installation.capaciteBatterie = capaciteBatterie || installation.capaciteBatterie;
//     installation.onduleurs = onduleurs || installation.onduleurs;
//     installation.systemeDeSupportage = systemeDeSupportage || installation.systemeDeSupportage;
//     installation.batteries = batteries || installation.batteries;

//     const updatedInstallation = await installation.save();

//     res.status(201).json(updatedInstallation);
    
//   } else {
//     res.status(404);
//     throw new Error('Installation non trouvée');
//   }
// });


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
