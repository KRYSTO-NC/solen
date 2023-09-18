import React from "react";
import { useParams } from "react-router-dom";
import { useGetInterventionByIdQuery } from "../slices/interventionSlice";
import { Col, Row } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

const InterventionDetails = () => {
  const { id: interventionId } = useParams();

  const {
    data: intervention,
    isLoading: interventionLoading,
    error: errorIntervention,
  } = useGetInterventionByIdQuery(interventionId);

  console.log(intervention);

  return (
    <>
      <h2>Détails de l'intervention</h2>
      <Row>
        <Col className="" md={2}>
          <p className={`tag ${intervention.status}`}>{intervention.status}</p>
        </Col>
        <Col>
          {intervention.status === "retard" ? (
            <p style={{ color: "green" }}>pas de retard</p>
          ) : (
            <p style={{ color: "red" }}>
              {" "}
              <FaExclamationCircle/>  {intervention.nbJoursDeRetard} Jours de retard
            </p>
          )}
        </Col>
      </Row>
    </>
  );
};


export default InterventionDetails;


