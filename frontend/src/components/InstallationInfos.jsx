import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";

const InstallationInfos = ({ installation }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title style={{ fontSize: "2rem" }}>
          Informations sur l'installation
        </Card.Title>
        <Row style={{marginBottom:"10px"}}>
            <Col md={3}>

        <Card.Text>
          <strong>Raccordée au réseau :</strong>{" "}
          {installation.raccordReseau ? <FaCheck style={{color: "green", fontSize: "20px" , marginLeft:"20px"}}/> : <FaTimes style={{color: "red", fontSize: "20px" , marginLeft:"20px"}}/>}
        </Card.Text>
            </Col>
            <Col md={3}>
        <Card.Text>
          <strong>garantie :</strong>{" "}
          {installation.garantie.isActive? <FaCheck style={{color: "green", fontSize: "20px" , marginLeft:"20px"}}/> : <FaTimes style={{color: "red", fontSize: "20px" , marginLeft:"20px"}}/>}
        </Card.Text>
            </Col>
            <Col md={3}>
        <Card.Text>
          <strong>Contrat de maintenance :</strong>{" "}
          {installation.garantie.isActive? <FaCheck style={{color: "green", fontSize: "20px" , marginLeft:"20px"}}/> : <FaTimes style={{color: "red", fontSize: "20px" , marginLeft:"20px"}}/>}
        </Card.Text>
            </Col>
            <Col md={3}>
        <Card.Text>
          <strong>Concessionaire:</strong>{" "}
          {installation.concessionaire? <p>{installation.concessionaire}</p> : <FaTimes style={{color: "red", fontSize: "20px" , marginLeft:"20px"}}/>}
        </Card.Text>
            </Col>
        </Row>
            
        {installation.raccordReseau && (
          <Row>
            <Col md={3}>
              <Card.Text>
                <strong>Type d'abonnement :</strong>{" "}
                {installation.typeAbonnement}
              </Card.Text>
            </Col>
            <Col md={3}>
              <Card.Text>
                <strong>Type de raccordement :</strong>{" "}
                {installation.typeInstallation.raccordement}
              </Card.Text>
            </Col>
            <Col md={3}>
              <Card.Text>
                <strong>Puissance :</strong>{" "}
                {installation.typeInstallation.puissance}
              </Card.Text>
            </Col>
            <Col md={3}>
              <Card.Text>
                <strong>Ampérage :</strong>{" "}
                {installation.typeInstallation.amperage}
              </Card.Text>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default InstallationInfos;
