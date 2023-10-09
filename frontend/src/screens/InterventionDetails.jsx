import React from "react";
import { useParams } from "react-router-dom";
import { useGetInterventionByIdQuery } from "../slices/interventionSlice";
import { Button, Col, Row } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const InterventionDetails = () => {
  const { id: interventionId } = useParams();
  const navigate = useNavigate();

  const {
    data: intervention,
    isLoading: interventionLoading,
    error: errorIntervention,
  } = useGetInterventionByIdQuery(interventionId);

  console.log(intervention);

  if (interventionLoading) return <Loader />;
  if (errorIntervention) return <p>Une erreur est survenue</p>;

  return (
    <>
      <h2>Détails de l'intervention</h2>

      <Row>
        <Col className="" md={2}>
          <Button
            className="btn btn-sm"
            onClick={() =>
              navigate(`/installation/${intervention.installationId}`)
            }
          >
            Voir l'installation
          </Button>
        </Col>
        <Col className="" md={2}>
          <p style={{textAlign:"center"}} className={`tag ${intervention.status}`}>{intervention.status}</p>
        </Col>
        <Col md={3}>
          {intervention.status != "retard" ? (
         
            <p className="tag" style={{ color: "white" , backgroundColor:"green", textAlign:'center'}}>pas de retard</p>
          ) : (
            <p style={{ color: "red" }}>
              {" "}
              <FaExclamationCircle /> {intervention.nbJoursDeRetard} Jours de
              retard
            </p>
          )}
        </Col>
      </Row>
    </>
  );
};

export default InterventionDetails;
