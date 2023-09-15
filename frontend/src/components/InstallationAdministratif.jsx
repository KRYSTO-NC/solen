import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useUpdateInstallationMutation } from "../slices/installationsApiSlice";
import { toast } from "react-toastify";

const InstallationAdministratif = ({ installation }) => {
  const [dates, setDates] = useState({
    eecDate: installation.demandeEEC?.date || "",
    enercalDate: installation.demandeEnercal?.date || "",
    dimencDate: installation.demandeDimenc?.date || "",
    conformiteDate: installation.conformite?.date || "",
  });

  const handleDateChange = (field, value) => {
    setDates({
      ...dates,
      [field]: value,
    });
  };

  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateInstallationMutation();

  useEffect(() => {
    if (isSuccess) {
        toast.success("Mise à jour réussie !");
      // Vous pouvez ajouter des actions à effectuer après une mise à jour réussie
      console.log("Mise à jour réussie !");
    }
  }, [isSuccess]);

  const handleUpdate = async (field, date) => {
    const updateData = {
        installationId: installation.id, // Assurez-vous que l'ID de l'installation est correct
      [field]: date,
    };
    console.log(updateData);
    await updateInstallation(updateData).unwrap();
  };

  return (
    <div className="stockage-section">
      <h3>suivie administratif</h3>
      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm p-2">
            <Card.Title>
              {installation.concessionaire === "EEC" ? "EEC" : "Enercal"}
            </Card.Title>
            <p>
              Status de la demande:{" "}
              <strong>
                {installation.concessionaire === "EEC"
                  ? installation.demandeEEC.status
                  : installation.demandeEnercal.status}
              </strong>
            </p>
            <Row>
              <label>Date de la demande:</label>
              <Col md={8}>
                <input
                  type="date"
                  value={
                    installation.concessionaire === "EEC"
                      ? dates.eecDate
                      : dates.enercalDate
                  }
                  onChange={(e) =>
                    handleDateChange(
                      installation.concessionaire === "EEC"
                        ? "eecDate"
                        : "enercalDate",
                      e.target.value
                    )
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  className="btn btn-sm"
                  onClick={() =>
                    handleUpdate(
                      installation.concessionaire === "EEC"
                        ? "eecDate"
                        : "enercalDate",
                      installation.concessionaire === "EEC"
                        ? dates.eecDate
                        : dates.enercalDate
                    )
                  }
                >
                  {installation.concessionaire === "EEC" &&
                  installation.demandeEEC.date
                    ? "Modifier"
                    : "Envoyer"}
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm p-2">
            <Card.Title>Dimenc</Card.Title>
            <p>
              Status: <strong>{installation.demandeDimenc.status}</strong>
            </p>

            <Row>
              <label>Date de la demande:</label>
              <Col md={8}>
                <input
                  type="date"
                  value={dates.dimencDate}
                  onChange={(e) =>
                    handleDateChange("dimencDate", e.target.value)
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  className="btn btn-sm"
                  onClick={() => handleUpdate("dimencDate", dates.dimencDate)}
                >
                  {installation.demandeDimenc.date ? "Modifier" : "Envoyer"}
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm p-2">
            <Card.Title>Conformité</Card.Title>
            <p>
              Status: <strong>{installation.conformite.status}</strong>
            </p>
            <Row>
              <label>Date de la demande:</label>
              <Col md={8}>
                <input
                  type="date"
                  value={dates.conformiteDate}
                  onChange={(e) =>
                    handleDateChange("conformiteDate", e.target.value)
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  className="btn btn-sm"
                  onClick={() =>
                    handleUpdate("conformiteDate", dates.conformiteDate)
                  }
                >
                  {installation.conformite.date ? "Modifier" : "Envoyer"}
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InstallationAdministratif;
