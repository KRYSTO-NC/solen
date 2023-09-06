import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetInstallationDetailsQuery } from "../slices/installationsApiSlice";
import { Badge, Col, Row } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../components/Loader";
import Message from "../components/Message";

const InstallationDetailsScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: installation,
    isLoading,
    refetch,
    error,
  } = useGetInstallationDetailsQuery(productId);

  console.log(installation);

  return (
    <>
      <Link className="btn btn-light my-3" to={"/installations"}>
        Retour{" "}
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
      <h5>Installation : {installation.id}</h5>
      <Row className="my-4">
        <Col>
          <Badge>{installation.status}</Badge>
        </Col>
        <Col className="check-installation">
          Contrat de maintenance
          {installation.activeMaintenanceContract.isActive ? (
              <FaCheck
              style={{ color: "green", marginLeft: "10px", fontSize: "30px" }}
              />
              ) : (
                  <FaTimes
                  style={{ color: "red", marginLeft: "10px", fontSize: "30px" }}
                  />
                  )}
        </Col>
        <Col className="check-installation">
          Garantie
          {installation.garantie.isActive ? (
              <FaCheck
              style={{ color: "green", marginLeft: "10px", fontSize: "30px" }}
              />
              ) : (
                  <FaTimes
                  style={{ color: "red", marginLeft: "10px", fontSize: "30px" }}
            />
          )}
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <strong>Adresse :</strong> {installation.address}
        </Col>
        <Col>
          <strong>concessionaire:</strong> {installation.concessionaire}
        </Col>
        <Col>
          <strong>concessionaire:</strong> {installation.concessionaire}
        </Col>
      </Row>
      </>
      )}
    </>
  );
};

export default InstallationDetailsScreen;
