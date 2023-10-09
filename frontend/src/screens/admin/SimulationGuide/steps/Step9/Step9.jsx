import React from "react";
import {
  useGetInstallationDetailsQuery,
  useUpdateInstallationMutation,
} from "../../../../../slices/installationsApiSlice";
import { Button } from "react-bootstrap";
import { useGetProductsQuery } from "../../../../../slices/dolibarr/dolliProductApiSlice";
import { useNavigate } from "react-router-dom"; // Import du hook useNavigate

const Step9 = ({ installation, onNext }) => {
  const navigate = useNavigate(); // Utilisation du hook useNavigate
  const { data: simmulation } = useGetInstallationDetailsQuery(installation);
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery();

  // Fonction pour gérer le clic sur le bouton
  const handleViewInstallation = () => {
    // Redirige vers la page de détails de l'installation
    navigate(`/installation/${simmulation.id}`);
  };

  return (
    <>
      <div className="heading">
        <h1>Installation créée avec succès : {simmulation.refference}</h1>
        
        {/* Bouton pour voir l'installation */}
        <Button onClick={handleViewInstallation}>Voir l'installation</Button>
      </div>
    </>
  );
};

export default Step9;
