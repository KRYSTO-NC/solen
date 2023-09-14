import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

const InstallationSupportage = ({ supportages , prof}) => {
  return (
    <div className="stockage-section">
      <h4>Supportages</h4>
      <Row>
      {supportages.map((support) => (
          <ProductCard key={support.id} product={support} prof={prof} />
        ))}
      </Row>
    </div>
  );
};

export default InstallationSupportage;
