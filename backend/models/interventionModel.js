import mongoose from "mongoose";

const interventionSchema = mongoose.Schema({
  installationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Installation", // Le modèle d'installation correspondant
    required: true
  },
  maintenanceContractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaintenanceContract", // Le modèle de contrat de maintenance correspondant
    required: false // Ce champ est facultatif car une intervention peut être faite sans contrat de maintenance
  },

  
  dateDemande: Date,
  dateRealisation: Date,
  datePrevisionnelle: Date,
  status: {
    type: String,
    enum: ["Demande", "Fait", "Retard"],
  },
  remarque: {
    type: String
  },

  nbJoursDeRetard: Number,
  date: Date,
  description: String,
  // Autres champs pertinents pour l'intervention
},
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

interventionSchema.pre('save', function(next) {
  if (this.dateDemande && !this.dateRealisation && !this.datePrevisionnelle) {
    this.status = "Demande";
  } else if (this.dateRealisation) {
    this.status = "Fait";
  } else if (this.datePrevisionnelle && this.datePrevisionnelle < new Date()) {
    this.status = "Retard";
    // Calculer le nombre de jours de retard
    const today = new Date();
    const timeDifference = today.getTime() - this.datePrevisionnelle.getTime();
    this.nbJoursDeRetard = Math.ceil(timeDifference / (1000 * 3600 * 24));
  }
  next();
});

const Intervention = mongoose.model("Intervention", interventionSchema);

export default Intervention;
