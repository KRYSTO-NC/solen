import mongoose from "mongoose";

const installationSchema = mongoose.Schema(
  {
     createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    activeMaintenanceContract: {
      isActive: {
        type: Boolean,
        default: false,
      },
      startDate: {
        type: Date,
        default: null,
      },
      endDate: {
        type: Date,
        default: null,
      },
    },

    // Informations générales
    typeInstallation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeInstallation",
    },
    refference: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Etude", "En Service", "Projet", "Sans Suite", "Termine"],
    },
    demandeur: {
      IdDolibarr: {
        type: String,
      },
      remarque: String,
    },

    benneficiaire: {
      IdDolibarr: {
        type: String,
      },
      remarque: String,
    },

    concessionaire: {
      type: String,
      enum: ["EEC", "Enercal"],
    },
    numCompteurEnercal: {
      type: Date,
    },
    address: {
      type: String,
      required: true,
    },

    numClientEnercal: {
      type: Date,
    },
    datePose: {
      type: Date,
    },
    datePrevisionelMiseEnService: {
      type: Date,
    },
    dateMiseEnService: {
      type: Date,
    },
    // Gestion de la garantie
    garantie: {
      actif: {
        type: Boolean,
      },
      duree: {
        type: Number,
        default: 1, // Durée par défaut de 1 an
      },
      dateFin: {
        type: Date,
      },
    },
    // Informations sur la demande EEC
    demandeEEC: {
      date: {
        type: Date,
      },
      dateReponse: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["enDemande", "Acceptée", "Refusé", "sous-reserve"],
      },
      remarque: String,
    },
    // Informations sur la demande Enercal
    demandeEnercal: {
      date: {
        type: Date,
      },
      dateReponse: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["enDemande", "Acceptée", "Refusé", "sous-reserve"],
      },
      remarque: String,
    },
    // Informations sur la demande Dimenc
    demandeDimenc: {
      date: {
        type: Date,
      },
      dateAcusee: {
        type: Date,
      },
      finDelaiRetraction: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["enDemande", "Acceptée", "Refusé", "sous-reserve"],
      },
      remarque: String,
    },
    // Informations sur la conformité
    conformite: {
      date: {
        type: Date,
      },
      remarque: String,
    },

    // Informations techniques
    puissanceSouscrite: {
      type: Number,
    },
    puissanceTotalOnduleur: {
      type: Number,
    },
    puissancePvEtHybrid: {
      type: Number,
    },
    valeurBridagePuissance: {
      type: Number,
    },
    valeurBridageReinjection: {
      type: Number,
    },
    stockage: {
      type: Boolean,
    },
    capaciteBatterie: {
      type: Number,
    },
    onduleurs: [
      {
        ref: {
          type: String,
        },
        nombre: {
          type: Number,
        },
      },
    ],
    systemeDeSupportage: [
      {
        ref: {
          type: String,
        },
        nombre: {
          type: Number,
        },
      },
    ],
    batteries: [
      {
        ref: {
          type: String,
        },
        nombre: {
          type: Number,
        },
        suppervision: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

installationSchema.pre("save", function (next) {
  if (this.dateMiseEnService) {
    // Convertir la durée en millisecondes (1 année = 365.25 jours pour tenir compte des années bissextiles)
    const dureeEnMs = this.garantie.duree * 365.25 * 24 * 60 * 60 * 1000;

    // Calculer la date de fin de la garantie
    this.garantie.dateFin = new Date(
      this.dateMiseEnService.getTime() + dureeEnMs
    );
  }
  next();
});

const Installation = mongoose.model("Installation", installationSchema);

export default Installation;
