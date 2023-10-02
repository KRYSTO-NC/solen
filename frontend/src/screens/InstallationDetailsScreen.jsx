import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetInstallationDetailsQuery,
  useUpdateInstallationMutation,
} from "../slices/installationsApiSlice";
import { Badge, Button, Col, Form, Modal, Row, Toast } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaBan, FaCheck, FaEye, FaFileInvoice, FaPage4, FaPlusCircle, FaQuoteLeft, FaTimes } from "react-icons/fa";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Message from "../components/Message";
import ThirdPartyCard from "../components/ThirdPartyCard";
import InstallationStockage from "../components/InstallationStockage";
import InstallationOnduleurs from "../components/InstallationOnduleurs";
import InstallationPanneaux from "../components/InstallationPanneaux";
import InstallationInfos from "../components/InstallationInfos";
import InstallationSupportage from "../components/InstallationSupportage";
import { useCreateProposalMutation } from "../slices/dolibarr/dolliProposalApiSlice";
import InstallationAdministratif from "../components/InstallationAdministratif";
import { useCreateNewInterventionForInstallationMutation } from "../slices/interventionSlice";

import InterventionsList from "../components/InterventionsList";
import InstallationDate from "../components/InstallationDate";

const InstallationDetailsScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const {
    data: installation,
    isLoading,
    refetch,
    error,
  } = useGetInstallationDetailsQuery(productId);

  const currentDate = new Date();
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000);

  const getStatusColor = (status) => {
    switch (status) {
      case "Projet":
        return "bg-warning";
      case "En service":
        return "bg-success";
      case "Sans Suite":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };
  const [createProposal, { isLoading: isCreating, isError, isSuccess }] =
    useCreateProposalMutation();

  const [
    updateInstallation,
    {
      isLoading: isUpdating,
      isError: errorUpdating,
      isSuccess: successUpdating,
    },
  ] = useUpdateInstallationMutation();
  const handleClasserSansSuite = async () => {
    try {
      await updateInstallation({
        installationId: installation.id,
        status: "Sans Suite",
      });
      refetch();
      toast.success(
        'Le statut de l\'installation a été mis à jour à "Sans Suite"'
      );
    } catch (error) {
      toast.error("Échec de la mise à jour du statut de l'installation");
    }
  };
  const handleCreateProposal = async () => {
    const batteryLines = installation.batteries.map((battery) => ({
      product_type: "1",
      fk_product: battery.ref, // Assurez-vous que c'est le bon ID
      qty: battery.quantity,
      subprice: battery.multiprices.part,
    }));
    const panneauLines = installation.panneaux.map((pan) => ({
      product_type: "1",
      fk_product: pan.ref, // Assurez-vous que c'est le bon ID
      qty: pan.quantity,
      subprice: pan.multiprices.part,
    }));

    const inverterLines = installation.onduleurs.map((inverter) => ({
      product_type: "1",
      fk_product: inverter.ref, // Assurez-vous que c'est le bon ID
      qty: inverter.quantity,
      subprice: inverter.multiprices.part,
    }));

    const supportLines = installation.systemeDeSupportage.map((support) => ({
      product_type: "1",
      fk_product: support.ref, // Assurez-vous que c'est le bon ID
      qty: support.quantity,
      subprice: support.multiprices.part,
    }));

    const lines = [
      ...batteryLines,
      ...inverterLines,
      ...supportLines,
      ...panneauLines,
    ];

    const proposalData = {
      socid: installation.demandeur,
      user_author_id: "1",
      date: unixTimestamp,
      array_options: {
        options_contact: "2",
        options_vente: "3",
      },
      lines,
    };

    try {
      const response = await createProposal({ proposalData }).unwrap();
      await updateInstallation({
        installationId: installation.id,
        idPropal: response,
      });
      refetch();
      toast.success(
        "La proposition et l'installation ont été mises à jour avec succès !"
      );
    } catch (error) {
      toast.error(
        "Échec de la création de la proposition ou de la mise à jour de l'installation"
      );
    }
  };

  // Demande intervention
  const [showModal, setShowModal] = useState(false);
  const [dateDemande, setDateDemande] = useState("");
  const [datePrevisionnelle, setDatePrevisionnelle] = useState("");
  const [remarque, setRemarque] = useState("");

  const handleDateDemandeChange = (e) => setDateDemande(e.target.value);
  const handleDatePrevisionnelleChange = (e) =>
    setDatePrevisionnelle(e.target.value);
  const handleRemarqueChange = (e) => setRemarque(e.target.value);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [createNewInterventionForInstallation] =
    useCreateNewInterventionForInstallationMutation();

  const handleCreateIntervention = async (e) => {
    e.preventDefault();
    const newIntervention = {
      dateDemande,
      datePrevisionnelle,
      remarque,
      // Ajoutez tous les autres champs nécessaires
    };
    console.log(newIntervention);
    try {
      await createNewInterventionForInstallation({
        installationId: productId,
        newIntervention,
      });
      refetch();
      setShowModal(false);
      toast.success("La demande d'intervention a été créée avec succès !");
      // Vous pouvez également refetch les données ou faire d'autres actions ici.
    } catch (error) {
      toast.error("Échec de la création de la demande d'intervention");
    }
  };

  return (
    <>
      <Link
        className="btn  btn-danger my-3 btn-sm"
        style={{ color: "white" }}
        to={"/installations"}
      >
        <FaArrowAltCircleLeft /> Retour
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h2>Installation - {installation.refference}</h2>
          {installation.idPropal === null ? (
            <Button className="mx-2 btn-sm" onClick={handleCreateProposal}>
              <FaFileInvoice style={{ marginRight: "5px" }} />
              Créer la proposition dans Dolibarr
            </Button>
          ) : (
            <Row>
              <hr />
              <Col md={10}>
                <p>
                  Identifiant de la proposition commercial Dolibarr :{" "}
                  <strong className="tag">{installation.idPropal} </strong>{" "}
                </p>
              </Col>
              <Col md={2}>
                <a
                  className="btn btn-primary btn-sm my-3"
                  href={`https://solisdev-erp.square.nc/comm/propal/card.php?id=${installation.idPropal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEye style={{ marginRight: "5px" }} />
                  Voir la proposition
                </a>
              </Col>
              <hr />
            </Row>
          )}
     

          {installation.status !== "Sans Suite" && (
     <Button
     className="btn btn-sm mb-2 btn-danger"
     style={{ color: "white" }}
     onClick={handleClasserSansSuite}
   >
     <FaBan    style={{ marginRight: "5px" }} />
     Classer sans-suite
   </Button>
)}
          
          <Button
            className="mx-2 btn-sm btn-warning"
            style={{ color: "white" }}
            onClick={handleShowModal}
          >
              <FaPlusCircle   style={{ marginRight: "5px" }} />
            Créer une demande d'intervention
          </Button>
          <Row className="my-4">
            <Col md={10}>
              <h5>Installation : {installation.refference}</h5>
              <p>
                <strong>Créer par : </strong> {installation.createdBy.name}{" "}
                <strong>le : </strong>{" "}
                {new Date(installation.createdAt).toLocaleDateString()}
              </p>
            </Col>
            <Col md={2}>
              <Badge style={{ marginRight: "5px" }} className={getStatusColor(installation.status)}>
                {installation.status}
              </Badge>
              {installation.prof === true ? (
                <Badge variant="primary">Professionnel</Badge>
              ) : (
                <Badge variant="secondary">Particullier</Badge>
              )}
            </Col>

            <Row className="my-4">
              <Col>
                <ThirdPartyCard
                  tierId={installation.demandeur}
                  title={"Demandeur"}
                />
              </Col>
              <Col>
                <ThirdPartyCard
                  tierId={installation.benneficiaire}
                  title={"benneficiare"}
                />
              </Col>
            </Row>
          </Row>

          <InstallationDate installation={installation} />

          <InstallationInfos installation={installation} />
          <InstallationAdministratif installation={installation} />
          <Row className="my-4"></Row>
          {installation.stockage && (
            <InstallationStockage
              capaciteBatterie={installation.capaciteBatterie}
              batteries={installation.batteries}
              prof={installation.prof}
              installationId={installation.id}
            />
          )}

          <InstallationOnduleurs
            onduleurs={installation.onduleurs}
            prof={installation.prof}
            installationId={installation.id}
          />
          <InstallationPanneaux
            panneaux={installation.panneaux}
            prof={installation.prof}
            installationId={installation.id}
          />
          <InstallationSupportage
            supportages={installation.systemeDeSupportage}
            prof={installation.prof}
            installationId={installation.id}
          />

          {installation.interventions.length > 0 ? (
            <InterventionsList interventions={installation.interventions} />
          ) : (
            <h2>Aucune interventions sur cette installations</h2>
          )}
        </>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Créer une nouvelle demande d'intervention</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateIntervention}>
            <Form.Group controlId="dateDemande">
              <Form.Label>Date de la demande</Form.Label>
              <Form.Control
                type="date"
                placeholder="Entrez la date de la demande"
                value={dateDemande}
                onChange={handleDateDemandeChange}
              />
            </Form.Group>

            <Form.Group controlId="datePrevisionnelle">
              <Form.Label>Date prévisionnelle de l'intervention</Form.Label>
              <Form.Control
                type="date"
                placeholder="Entrez la date prévisionnelle de l'intervention"
                value={datePrevisionnelle}
                onChange={handleDatePrevisionnelleChange}
              />
            </Form.Group>

            <Form.Group controlId="remarque">
              <Form.Label>Remarque</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Entrez une remarque"
                value={remarque}
                onChange={handleRemarqueChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Créer
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-sm btn-danger"
            style={{ color: "white" }}
            variant="secondary"
            onClick={handleCloseModal}
          >
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InstallationDetailsScreen;
