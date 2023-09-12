import React, { useState, useEffect } from "react";
import {
  useGetInstallationDetailsQuery,
  useUpdateInstallationMutation,
} from "../../../../../slices/installationsApiSlice";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../../../../slices/dolibarr/dolliProductApiSlice";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import Loader from "../../../../../components/Loader";
import Message from "../../../../../components/Message";

const Step5 = ({ installation, onNext }) => {
  // Ici, "installation" contient votre installationId.
  console.log("Installation ID dans Step5:", installation);
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery();
  console.log(products);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [stockage, setStockage] = useState(false);
  const [typeBatterie, setTypeBatterie] = useState("");
  const [capaciteBatterie, setCapaciteBatterie] = useState(0);

  const addProduct = (product) => {
    setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
  };
  const removeProduct = (id) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== id)
    );
  };

  const updateQuantity = (id, quantity) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const {
    data: simulation,
    isLoading,
    error,
  } = useGetInstallationDetailsQuery(installation);

  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateInstallationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInstallation({
        installationId: installation,
        stockage,
        typeBatterie,
        capaciteBatterie,
      });
      toast.success("Mise à jour réussie.");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour.");
      console.error("Erreur:", error);
    }
  };

  const handleValidate = async () => {
    console.log(selectedProducts);
  };

  useEffect(() => {
    if (isSuccess) {
      onNext();
    }
  }, [isSuccess, onNext]);

  return (
    <>
      <div className="heading">
        <h1>Stockage</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group controlId="stockage" className="my-2">
              <Form.Label>L'installation aura t'elle du stockage</Form.Label>
              <Form.Check
                type="checkbox"
                checked={stockage}
                onChange={(e) => setStockage(e.target.checked)}
              />
            </Form.Group>
          </Col>
        </Row>
        {stockage && (
          <>
            <Row>
              <Col md={4}>
                <Form.Group controlId="typeBatterie" className="my-2">
                  <Form.Label>Type de Batterie</Form.Label>
                  <Form.Select
                    value={typeBatterie}
                    onChange={(e) => setTypeBatterie(e.target.value)}
                  >
                    <option value="" disabled>
                      Choisir un type
                    </option>
                    <option value="Lithium Ion">Lithium Ion</option>
                    <option value="Plomb">Plomb</option>
                    <option value="Autre">Autre</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="capaciteBatterie" className="my-2">
                  <Form.Label>Capacité de la Batterie</Form.Label>
                  <Form.Control
                    type="number"
                    value={capaciteBatterie}
                    onChange={(e) =>
                      setCapaciteBatterie(Number(e.target.value))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        )}
        <Button type="submit" variant="primary" className="fixed-bottom mb-3">
          Suivant
        </Button>
      </Form>

      <Row>
        <Col md={6}>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Refference</th>
                <th>Désignation</th>

                <th></th>
              </tr>
            </thead>
            {loadingProducts ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {typeof error.data.message === "string"
                  ? error.data.message
                  : "Une erreur est survenue"}
              </Message>
            ) : (
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.ref}</td>
                    <td>{product.label}</td>
                    <td>
                      <Button
                        variant="success"
                        className="btn-sm"
                        onClick={() => addProduct(product)}
                      >
                        <FaPlusCircle />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </Col>

        <Col md={4}>
          <h3>Sélection :</h3>
          <ul>
            {selectedProducts.map((product) => (
              <>
                <Row>
                  <Col md={4}>
                    <li key={product.id}>{product.label}</li>
                  </Col>
                  <Col md={3}>
                    <Form.Label>Quantité</Form.Label>
                    <Form.Control
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product.id, Number(e.target.value))
                      }
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label>Supervision</Form.Label>
                    <Form.Control
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product.id, Number(e.target.value))
                      }
                    />
                  </Col>

                  <Col md={2}>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="danger"
                      className="btn-sm"
                      onClick={() => removeProduct(product.id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
                <hr />
              </>
            ))}
          </ul>
          <Button variant="primary" onClick={handleValidate}>
            Valider
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Step5;
