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
console.log(req.user._id);
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
// const updateInstallation = asyncHandler(async (req, res, next) => {
//   console.log("Received body:", req.body);
  
//   const idToUpdate = req.body.installationId ;
  


//   if (!idToUpdate) {
//     return res.status(400).json({ success: false, message: "No ID provided" });
//   }

//   const updateData = {
//     benneficiaire: req.body.benneficiaire,
//     demandeur: req.body.demandeur  // Ajout de cette ligne
//   };
  
//   console.log("Data to Update:", updateData);

//   try {
//     const installation = await Installation.findByIdAndUpdate(
//       idToUpdate,
//       updateData,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!installation) {
//       console.log("Installation not found");
//       return res.status(404).json({ success: false, message: "Installation not found" });
//     }

//     console.log("Updated installation:", installation);

//     res.status(200).json({
//       success: true,
//       data: installation,
//     });
//   } catch (error) {
//     console.error("Error updating installation:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });


// @desc Update an installation
// @route PUT /api/installations
// @access Private
const updateInstallation = asyncHandler(async (req, res, next) => {
  console.log("Received body:", req.body);
  
  const idToUpdate = req.body.installationId;

  if (!idToUpdate) {
    return res.status(400).json({ success: false, message: "No ID provided" });
  }

  // Retirez le champ createdBy de req.body
  const { createdBy, ...updateData } = req.body;

  console.log("LOG IN CONTROLLER : Data to Update:", updateData);

  try {
    const installation = await Installation.findByIdAndUpdate(
      idToUpdate,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!installation) {
      console.log("Installation not found");
      return res.status(404).json({ success: false, message: "Installation not found" });
    }

    console.log("Updated installation:", installation);

    res.status(200).json({
      success: true,
      data: installation,
    });
  } catch (error) {
    console.error("Error updating installation:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



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
