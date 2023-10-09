import mongoose from "mongoose";

const ObservationSchema = new mongoose.Schema(
  {
    interventionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Intervention", // Le modèle d'installation correspondant
    },
    
    title: {
      type: String,
    },
    txt: {
      type: String,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Observation = mongoose.model("Observation", ObservationSchema);

export default Observation;
