import asyncHandler from '../middleware/asyncHandler.js'
import Option from '../models/optionModel.js'


// @desc Fetch all options
// @route GET /api/options
// @access Private
const getOptions = asyncHandler(async (req, res) => {
    const options = await Option.find({});
    if (options) {
        res.status(200).json(options);
    } else {
        res.status(404).json({ message: 'Aucune option trouvée' });
    }
})




export {
  getOptions
  }
  