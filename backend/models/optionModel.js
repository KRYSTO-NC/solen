import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    details: {
      type: String,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Option = mongoose.model("Option", OptionSchema);

export default Option;
