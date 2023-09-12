import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetInstallationDetailsQuery } from "../slices/installationsApiSlice";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../components/Loader";
import Message from "../components/Message";

const InstallationDetailsScreen = () => {
  const { id: productId } = useParams();

  const {
    data: installation,
    isLoading,
    refetch,
    error,
  } = useGetInstallationDetailsQuery(productId);

  console.log(installation);

  return (
    <>
      <Link className="btn btn-light my-3" to={"/installations"}>
        Retour{" "}
      </Link>
      <Button className="mx-2 btn-sm">
        Créer le devis dans Dolibarr
      </Button>

      <p>ICI le recap de l'installation ou de la simuulationavec lien pour acceder au dolibarr (l'utilisatuer deva être connecter ) </p>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
      <h5>Installation : {installation.id}</h5>
      <Row className="my-4">
        <Col>
          <Badge>{installation.status}</Badge>
        </Col>
        <Col className="check-installation">
          Contrat de maintenance
          {installation.activeMaintenanceContract.isActive ? (
              <FaCheck
              style={{ color: "green", marginLeft: "10px", fontSize: "30px" }}
              />
              ) : (
                  <FaTimes
                  style={{ color: "red", marginLeft: "10px", fontSize: "30px" }}
                  />
                  )}
        </Col>
        <Col className="check-installation">
          Garantie
          {installation.garantie.isActive ? (
              <FaCheck
              style={{ color: "green", marginLeft: "10px", fontSize: "30px" }}
              />
              ) : (
                  <FaTimes
                  style={{ color: "red", marginLeft: "10px", fontSize: "30px" }}
            />
          )}
          <p>Date de fin  {new Date(installation.garantie?.dateFin).toLocaleDateString()}</p>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <strong>Adresse :</strong> {installation.address}
        </Col>
        <Col>
          <strong>concessionaire:</strong> {installation.concessionaire}
        </Col>
        <Col>
        
        </Col>
      </Row>
      </>
      )}
    </>
  );
};

export default InstallationDetailsScreen;
