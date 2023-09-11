import React, { useState } from "react";
import { useGetThirdPartiesQuery } from "../../../../../slices/dolibarr/dolliThirdPartyApiSlice";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import { Button, Col, Row } from "react-bootstrap";
import SearchBar from "../../../../../components/SearchBar";
import { FaPlusCircle } from "react-icons/fa";
import { useGetInstallationDetailsQuery } from "../../../../../slices/installationsApiSlice";

const Step4 = ({ installation }) => {
  // Ici, "installation" contient votre installationId.
  console.log("Installation ID dans Step2:", installation);

  const {
    data: simulation,
    isLoading,
    refetch,
    error,
  } = useGetInstallationDetailsQuery(installation);
refetch()
  console.log(simulation);

  return (
    <>
      <h1>step 2</h1>
    </>
  );
};

export default Step4;
