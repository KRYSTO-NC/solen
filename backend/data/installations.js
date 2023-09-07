const installations = [
  {
    typeInstallation: {
      raccordement: "mono",
      puissance: "18",
      amperage: "18",
    },

    status: "En Service",
    demandeur: "b99b93b5-48d4-4a4b-bb7a-2098e046d07d",
    beneficiaire: "4b32fa45-4c6b-41bc-bc26-bc9e6c378351",
    concessionaire: "EEC",
    address: "PSC 4833, Box 4856, APO AA 47097",
    numCompteurEnercal: "941463677",
    numClientEnercal: "835213383402",
    garantie: {
      duree: "10",
    },
    demandeEEC: {
      date: "2023-05-18",
      dateReponse: "2023-06-18",
      remarque: "Care company size sing group public sister.",
      status: "Accepté",
    },
    demandeEnercal: {
      date: "2023-05-18",
      dateReponse: "2023-06-18",
      status: "Accepté",
      remarque: "Care company size sing group public sister.",
    },
    demandeDimenc: {
      date: "2023-05-18",
      dateAcusee: "2023-06-18",
      status: "Accepté",
      remarque: "Audience political human.",
    },
    conformite: {
      date: "2023-05-18",
      remarque: "Month prevent military record mother former large.",
    },

    datePose: "2023-05-18",
 
    datePrevisionelMiseEnService: "2023-05-18",
    dateMiseEnService: "2023-05-18",

    puissanceSouscrite: "15",
    puissanceTotalOnduleur: "25",
    puissancePvEtHybrid: "19",
    valeurBridagePuissance: "1",
    valeurBridageReinjection: "2",
    stockage: true,
    capaciteBatterie: "53",
    onduleurs: [{ ref: "OND57", nombre: 5 }],
    systemeDeSupportage: [{ ref: "SUPP778", nombre: 2 }],
    batteries: [
      { ref: "BAT680", nombre: 3, suppervision: 0 },
      { ref: "BAT744", nombre: 1, suppervision: 0 },
    ],
  },
];

export default installations;
