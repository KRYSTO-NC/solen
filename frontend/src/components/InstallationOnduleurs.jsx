import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

const InstallationOnduleurs = ({ onduleurs , prof}) => {
  return (
    <div className="stockage-section">
      <h4>Onduleurs</h4>
      <Row>
      {onduleurs.map((onduleur) => (
          <ProductCard key={onduleur.id} product={onduleur} prof={prof}/>
        ))}
      </Row>
    </div>
  );
};

export default InstallationOnduleurs;
