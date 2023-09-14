import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useGetProductDetailsQuery } from "../slices/dolibarr/dolliProductApiSlice";
import Loader from "./Loader";
import Message from "./Message";

const ProductCard = ({ product, prof }) => {
  const { data, isLoading, refetch, error } = useGetProductDetailsQuery(
    product.ref
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant="danger">
        {error?.data?.message || error.message}
      </Message>
    );
  }

  const priceKey = prof ? "2" : "1";
  const calculatedPrice = data.multiprices
    ? typeof data.multiprices[priceKey] !== "undefined" &&
      data.multiprices[priceKey] !== null
      ? parseFloat(data.multiprices[priceKey]).toFixed(0) + " XPF"
      : "Non disponible"
    : "Non disponible";

  return (
    <Col md={3}>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title style={{ 
            fontSize: '1rem', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            color: "blue"
          }}>
            {data.label}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
             <strong>REF :</strong> {data.ref}
          </Card.Subtitle>
          <Row>
            <Col md={6}>
              <Card.Text>
                <strong>Quantité:</strong> {product.quantity}
              </Card.Text>
            </Col>
            {product.supervision && (
              <Col md={6}>
                <Card.Text>
                  <strong>Supervision:</strong> {product.supervision}
                </Card.Text>
              </Col>
            )}
            <Col md={12}>
              <Card.Text>
                <strong>Prix:</strong> {calculatedPrice}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
