import mongoose from "mongoose";



const maintenanceContractSchema = mongoose.Schema({
  installationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Installation", // Le modèle d'installation correspondant
    required: true
  },
  
  options: [
    {
      optionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option", // Le modèle d'option correspondant
        required: true
      },
      recurrence: {
        type: String, // ou Number, selon vos besoins
        required: true
      }
    }

  ],
  startDate: Date,
  endDate: Date
},
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

maintenanceContractSchema.pre('save', async function(next) {
  // Trouver l'installation correspondante
  const Installation = mongoose.model('Installation');
  const installation = await Installation.findById(this.installationId);

  // Mettre à jour l'objet 'activeMaintenanceContract'
  installation.activeMaintenanceContract = {
    isActive: true,
    startDate: this.startDate,
    endDate: this.endDate
  };
  
  await installation.save();

  next();
});

maintenanceContractSchema.pre('remove', async function(next) {
  // Trouver l'installation correspondante
  const Installation = mongoose.model('Installation');
  const installation = await Installation.findById(this.installationId);

  // Vérifier s'il y a d'autres contrats de maintenance actifs
  const MaintenanceContract = mongoose.model('MaintenanceContract');
  const activeContracts = await MaintenanceContract.find({ installationId: this.installationId });

  if (activeContracts.length === 1) {
    // Mettre à jour l'objet 'activeMaintenanceContract'
    installation.activeMaintenanceContract = {
      isActive: false,
      startDate: null,
      endDate: null
    };
    
    await installation.save();
  }

  next();
});

const MaintenanceContract = mongoose.model("MaintenanceContract", maintenanceContractSchema);

export default MaintenanceContract;
