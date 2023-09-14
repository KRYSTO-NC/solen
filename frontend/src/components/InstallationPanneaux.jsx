import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

const InstallationPanneaux = ({ panneaux , prof }) => {
  
  return (
    <div className="stockage-section">
      <h4>Panneaux</h4>
      
      <Row>
      {panneaux.map((pan) => (
          <ProductCard key={pan.id} product={pan} prof={prof} />
        ))}
      </Row>
   
    </div>
  );
};

export default InstallationPanneaux;
