import bcrypt from "bcryptjs";

const options = [
  {
    name: "Nettoyage des panneaux",
    details: "Cette option couvre le nettoyage régulier des panneaux solaires pour assurer leur efficacité maximale.",
  },
  {
    name: "Inspection visuelle",
    details: "Un technicien effectuera une inspection visuelle des panneaux et de l'équipement associé pour détecter les signes de dégâts ou d'usure.",
  },
  {
    name: "Tests de performance",
    details: "Des tests réguliers seront effectués pour s'assurer que les panneaux fonctionnent à leur capacité maximale.",
  },
  {
    name: "Remplacement des pièces défectueuses",
    details: "Cette option couvre le coût du remplacement des pièces qui sont devenues défectueuses ou qui ont atteint la fin de leur durée de vie utile.",
  },
  {
    name: "Mises à jour logicielles",
    details: "Si le système utilise des logiciels pour la surveillance ou la gestion, cette option couvre les mises à jour nécessaires.",
  },
  {
    name: "Garantie étendue",
    details: "Cette option étend la garantie standard, offrant une couverture supplémentaire pour certaines réparations ou remplacements.",
  }
];

export default options;
