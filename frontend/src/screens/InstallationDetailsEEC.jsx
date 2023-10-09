import React, { useState } from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {
  useUpdateInstallationMutation,
  useGetInstallationDetailsQuery,
} from "../slices/installationsApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader"; // Assurez-vous que le chemin d'importation est correct
import Message from "../components/Message"; // Assurez-vous que le chemin d'importation est correct

const InstallationDetailsEEC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newRemark, setNewRemark] = useState("");
  const [showDateModal, setShowDateModal] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [showVisitDateModal, setShowVisitDateModal] = useState(false);
  const [newVisitDate, setNewVisitDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const location = useLocation();
  const installationId = location.state.installation.id;

  const {
    data: installation,
    refetch,
    isLoading,
    error,
  } = useGetInstallationDetailsQuery(installationId);
  const [updateInstallation] = useUpdateInstallationMutation();

  const handleAddRemark = async () => {
    try {
      const updatedData = {
        installationId: installation.id,
        demandeEEC: {
          ...installation.demandeEEC,
          remarque: newRemark,
        },
      };

      await updateInstallation(updatedData).unwrap();
      toast.success("Remarque ajoutée avec succès.");
      refetch();
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'ajout de la remarque.");
    }

    setShowModal(false);
  };

  const handleUpdateStatus = async () => {
    try {
      const updatedData = {
        installationId: installation.id,
        demandeEEC: {
          ...installation.demandeEEC,
          status: selectedStatus, // Mettre à jour le statut
        },
      };

      await updateInstallation(updatedData).unwrap();
      toast.success("Statut modifié avec succès.");
      refetch();
    } catch (error) {
      toast.error("Une erreur est survenue lors de la modification du statut.");
    }
  };
  const handleUpdateDate = async () => {
    try {
      const updatedData = {
        installationId: installation.id,
        demandeEEC: {
          ...installation.demandeEEC,
          eecDate: newDate, // Mettre à jour la date
        },
      };

      await updateInstallation(updatedData).unwrap();
      toast.success("Date modifiée avec succès.");
      refetch();
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la modification de la date."
      );
    }

    setShowDateModal(false); // Fermer le modal
  };

  const handleUpdateVisitDate = async () => {
    try {
      const updatedData = {
        installationId: installation.id,
        demandeEEC: {
          ...installation.demandeEEC,
          dateReponse: newVisitDate, // Mettre à jour la date de la visite
        },
      };

      await updateInstallation(updatedData).unwrap();
      toast.success("Date de la visite modifiée avec succès.");
      refetch();
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la modification de la date de la visite."
      );
    }

    setShowVisitDateModal(false); // Fermer le modal
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {typeof error.data?.message === "string"
            ? error.data.message
            : "Une erreur est survenue"}
        </Message>
      ) : (
        <>
          <Link
          className="btn  btn-danger my-3 btn-sm" style={{color:"white"}}
            to={`/installation/${installationId}`}
          >
            Retour
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Installation : {installation.refference} Demande EEC</h1>
            <h4 className="tag p-2" style={{ color: "black" }}>
              {installation.demandeEEC.status}
            </h4>
          </div>

          <div className="mt-2 d-flex align-items-center">
            <p className="mr-3">Modifier le statut de la demande:</p>
            <Form.Select
              aria-label="Statut"
              onChange={(e) => setSelectedStatus(e.target.value)}
              value={selectedStatus}
              className="mr-3"
            >
              <option value="">Sélectionnez le statut</option>

              <option value="En Demande">Demande</option>
              <option value="Accepté">Accepté</option>
              <option value="Refusé">Refusé</option>
              <option value="sous-reserve">sous-reserve</option>
            </Form.Select>
            <Button
              style={{ marginLeft: "10px" }}
              variant="btn btn-sm btn-warning"
              onClick={handleUpdateStatus}
            >
              <FaEdit />
            </Button>
          </div>

          <Row className="mb-4">
  {/* Date de la demande */}
  <Col md={6}>
    <div className="d-flex align-items-center">
      <h5 className="mr-3">Demande:</h5>
      {installation.demandeEEC.eecDate ? (
        <p  style={{marginLeft:"10px"}} className="mr-3"> {new Date(installation.demandeEEC.eecDate).toLocaleDateString()}</p>
      ) : (
        <p className="mr-3">Aucune Date</p>
      )}
      <Button  style={{marginLeft:"10px"}} variant="btn btn-sm btn-warning" onClick={() => setShowDateModal(true)}>
        <FaEdit />
      </Button>
    </div>
  </Col>

  {/* Date et statut de la réponse */}
  <Col md={6}>
    <div className="d-flex align-items-center">
      <h5 className="mr-3">Réponse:</h5>
      {installation.demandeEEC.dateReponse ? (
        <p style={{marginLeft:"10px"}} className="mr-3">{new Date(installation.demandeEEC.dateReponse).toLocaleDateString()}</p>
      ) : (
        <p className="mr-3">Aucune Date</p>
      )}
      <Button style={{marginLeft:"10px"}} variant="btn btn-sm btn-warning" onClick={() => setShowVisitDateModal(true)}>
        <FaEdit />
      </Button>
    </div>
   
  </Col>
</Row>


          <section className="margin-2">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Observations et remarques</h5>
              <Button
                variant="btn btn-sm btn-success"
                onClick={() => setShowModal(true)}
              >
                <FaPlusCircle style={{ color: "white" }} />
              </Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Ajouter une remarque</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Nouvelle remarque</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newRemark}
                      onChange={(e) => setNewRemark(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Annuler
                </Button>
                <Button variant="primary" onClick={handleAddRemark}>
                  Ajouter
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="remarque-box">
              <p>{installation.demandeEEC.remarque}</p>
            </div>
          </section>

          {/* Modal pour la date */}
          <Modal show={showDateModal} onHide={() => setShowDateModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Modifier la date de la demande</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nouvelle date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDateModal(false)}
              >
                Annuler
              </Button>
              <Button variant="primary" onClick={handleUpdateDate}>
                Modifier
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Modal pour la date de la visite */}
          <Modal
            show={showVisitDateModal}
            onHide={() => setShowVisitDateModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modifier la date de la visite</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nouvelle date de la visite</Form.Label>
                  <Form.Control
                    type="date"
                    value={newVisitDate}
                    onChange={(e) => setNewVisitDate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowVisitDateModal(false)}
              >
                Annuler
              </Button>
              <Button variant="primary" onClick={handleUpdateVisitDate}>
                Modifier
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default InstallationDetailsEEC;
