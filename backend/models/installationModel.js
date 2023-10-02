import mongoose from 'mongoose'

const installationSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    refference: {
      type: String,
    },

    idPropal: {
      type: String,
      default: null,
    },

    // si True type abonement
    raccordReseau: {
      type: Boolean,
    },

    prof: {
      type: Boolean,
    },

    typeAbonnement: {
      type: String,
      enum: ['Basse tension', 'Haute tension', 'non defini'],
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
      raccordement: {
        type: String,
        enum: ['mono', 'tri', 'non defini'],
        default: 'non defini',
      },
      puissance: {
        type: Number,
        default: 0,
      },
      amperage: {
        type: Number,
        default: 0,
      },
    },

    status: {
      type: String,
      enum: ['Template', 'Etude', 'En Service', 'Projet', 'Sans Suite'],
      default: 'Template',
    },


    demandeur: {
      type: String,
      default: 'non renseigné',
    },

    benneficiaire: {
      type: String,
      default: 'non renseigné',
    },

    concessionaire: {
      type: String,
      enum: ['EEC', 'Enercal', 'non renseigné'],
      default: 'non renseigné',
    },
    numCompteurEnercal: {
      type: String,
      default: 'non renseigné',
    },

    numClientEnercal: {
      type: String,
      default: 'non renseigné',
    },

    address: {
      type: String,
      default: 'Aucune adresse renseignée',
    },

    // Gestion de la garantie
    garantie: {
      isActive: {
        type: Boolean,
        default: false,
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
      eecDate: {
        type: Date,
      },
      dateReponse: {
        type: Date,
      },
      status: {
        type: String,
        enum: ['Non Commencé','En Demande', 'Accepté', 'Refusé', 'sous-reserve'],
        default: 'Non Commencé',
      },
      remarque: {
        type: String,
        default: 'Aucune remarque',
      },
    },
    // Informations sur la demande Enercal
    demandeEnercal: {
      enercalDate: {
        type: Date,
      },
      dateReponse: {
        type: Date,
      },
      status: {
        type: String,
        enum: ['Non Commencé','En Demande', 'Accepté', 'Refusé', 'sous-reserve'],
        default: 'Non Commencé',
      },
      remarque: {
        type: String,
        default: 'Aucune remarque',
      },
    },
    // Informations sur la demande Dimenc
    demandeDimenc: {
      dimencDate: {
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
        enum: ['Non Commencé','En Demande', 'Accepté', 'Refusé', 'sous-reserve'],
        default: 'Non Commencé',
      },
      remarque: {
        type: String,
        default: 'Aucune remarque',
      },
    },
    // Informations sur la conformité
    conformite: {
      conformiteDate: {
        type: Date,
      },
      visiteDate: {
        type: Date,
      },
      idTiers: {
        type: String,
      },
      remarque: {
        type: String,
        default: 'Aucune remarque',
      },
      status: {
        type: String,
        enum: ['Non Commencé','En Demande', 'Accepté', 'Refusé', 'sous-reserve'],
        default: 'Non Commencé',
      },  
    },

    datePrevisionelPose: {
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

    // Informations techniques
    puissanceSouscrite: {
      type: Number,
      default: 0,
    },

    puissanceTotalOnduleur: {
      type: Number,
      default: 0,
    },

    puissancePv: {
      type: Number,
      default: 0,
    },

    valeurBridageReinjection: {
      type: Number,
      default: 0,
    },

    // si stockage true
    stockage: {
      type: Boolean,
      default: false,
    },

    typeBaterrie: {
      type: String,
      enum: ['Lithium Ion', 'Plomb', 'Autre'],
    },

    capaciteBatterie: {
      type: Number,
      default: 0,
    },
    batteries: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        supervision: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],

    onduleurs: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
    systemeDeSupportage: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],

    panneaux: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        supervision: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
    administratif: [
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
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Reverse populate avec des virtuals
installationSchema.virtual('interventions', {
  ref: 'Intervention',
  localField: '_id',
  foreignField: 'installationId',
  justOne: false,
})
// Reverse populate avec des virtuals
installationSchema.virtual('maintenanceContracts', {
  ref: 'MaintenanceContract',
  localField: '_id',
  foreignField: 'installationId',
  justOne: false,
})

installationSchema.pre('save', async function (next) {
  console.log('Pre-save hook triggered');

  // Calcul de la date de fin de garantie
  if (this.dateMiseEnService && this.garantie.duree) {
    const dureeEnMsGarantie = this.garantie.duree * 365.25 * 24 * 60 * 60 * 1000;
    this.garantie.dateFin = new Date(
      this.dateMiseEnService.getTime() + dureeEnMsGarantie
    );
    this.garantie.isActive = true;  // La garantie est active
  } else {
    this.garantie.isActive = false;  // La garantie n'est pas active car la date de mise en service n'est pas définie
  }

  // Génération du champ refference
  if (!this.refference) {
    const currentYear = new Date().getFullYear();
    const count = await Installation.countDocuments({
      refference: new RegExp(`^${currentYear}-`, 'i')
    });
    this.refference = `${currentYear}-${count + 1}`;
  }

  
  // Calcul de la date de fin du délai de rétractation
  if (this.demandeDimenc.dateAcusee) {
   
    const dureeEnMsDimenc = 30 * 24 * 60 * 60 * 1000;
    this.demandeDimenc.finDelaiRetraction = new Date(
      this.demandeDimenc.dateAcusee.getTime() + dureeEnMsDimenc
    );
  } else {
    this.demandeDimenc.finDelaiRetraction = null;  // Mettre le champ à null si dateAcusee n'est pas défini
  }


 

  next();
});


installationSchema.post('find', function (docs) {
  for (let doc of docs) {
    if (doc.garantie.dateFin) {
      if (new Date() > new Date(doc.garantie.dateFin)) {
        doc.garantie.isActive = false
      }
    } else {
      doc.garantie.isActive = false
    }
  }
})

installationSchema.post('findOne', function (doc) {
  if (doc) {
    if (doc.garantie.dateFin) {
      if (new Date() > new Date(doc.garantie.dateFin)) {
        doc.garantie.isActive = false
      }
    } else {
      doc.garantie.isActive = false
    }
  }
})

const Installation = mongoose.model('Installation', installationSchema)

export default Installation
