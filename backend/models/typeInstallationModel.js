import mongoose from "mongoose";

const TypeInstallationSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
    },

    raccordement: {
      type: String,
      enum: ["mono", "tri"],
    },
    puissance: {
      type: Number,
    },
    
    amperage: {
      type: Number,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const TypeInstallation = mongoose.model(
  "TypeInstallation",
  TypeInstallationSchema
);


export default TypeInstallation;
