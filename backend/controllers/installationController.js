import asyncHandler from "../middleware/asyncHandler.js";
import Installation from "../models/installationModel.js";



// @desc Fetch all installations
// @route GET /api/installations
// @access Public
const getInstallations = asyncHandler(async (req, res) => {
  const installations = await Installation.find({});
  res.json(installations);
});


// @desc fetch single installation
// @route GET /api/installations/:id
// @access Public
const getInstallationById = asyncHandler(async (req, res) => {
  const installation = await Installation.findById(req.params.id);
  if (installation) {
    return res.json(installation);
  }
  res.status(404);
  throw new Error("Installation non trouvée");
});


export { getInstallations, getInstallationById };