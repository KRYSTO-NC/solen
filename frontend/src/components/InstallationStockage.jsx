import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

const InstallationStockage = ({ batteries, capaciteBatterie , prof }) => {
  return (

    
    <div className="stockage-section">
      <h4>Stockage</h4>
      <Row>
        <Col md={6}>
          <p>Capacité de stockage : {capaciteBatterie} kWh</p>
        </Col>
        <Col md={6}>
          <p>Nombre de batteries : {batteries.length}</p>
        </Col>
      </Row>
      <Row>
        {batteries.map((battery) => (
          <ProductCard key={battery.id} product={battery} prof={prof} />
        ))}
      </Row>
    </div>
  );
};

export default InstallationStockage;