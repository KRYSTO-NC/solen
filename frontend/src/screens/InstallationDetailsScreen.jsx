import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetInstallationDetailsQuery } from "../slices/installationsApiSlice";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ThirdPartyCard from "../components/ThirdPartyCard";
import InstallationStockage from "../components/InstallationStockage";
import InstallationOnduleurs from "../components/InstallationOnduleurs";
import InstallationPanneaux from "../components/InstallationPanneaux";
import InstallationInfos from "../components/InstallationInfos";
import InstallationSupportage from "../components/InstallationSupportage";

const InstallationDetailsScreen = () => {
  const { id: productId } = useParams();

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
      <Button className="mx-2 btn-sm">Créer le devis dans Dolibarr</Button>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row className="my-4">
            <Col md={10}>
              <h5>Installation : {installation.refference}</h5>
              <p>
                <strong>Créer par : </strong> {installation.createdBy.name}{" "}
                <strong>le : </strong>{" "}
                {new Date(installation.createdAt).toLocaleDateString()}
              </p>
            </Col>
            <Col md={2}>
              <Badge style={{marginRight : "10px"}}>{installation.status}</Badge>
              {installation.prof === true ? (
                <Badge variant="success">Professionnel</Badge>
              ) : (<Badge variant="success">Particullier</Badge>) }
            </Col>
            
            <Row className="my-4">
              <Col>
                <ThirdPartyCard
                  tierId={installation.demandeur}
                  title={"Demandeur"}
                />
              </Col>
              <Col >
                <ThirdPartyCard
                  tierId={installation.benneficiaire}
                  title={"benneficiare"}
                />
              </Col>
            </Row>
            <Col className="check-installation">
              Contrat de maintenance
              {installation.activeMaintenanceContract.isActive ? (
                <FaCheck
                  style={{
                    color: "green",
                    marginLeft: "10px",
                    fontSize: "30px",
                  }}
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
                  style={{
                    color: "green",
                    marginLeft: "10px",
                    fontSize: "30px",
                  }}
                />
              ) : (
                <FaTimes
                  style={{ color: "red", marginLeft: "10px", fontSize: "30px" }}
                />
              )}
              {installation.garantie?.dateFin && (
                <p>
                  Date de fin{" "}
                  {new Date(
                    installation.garantie?.dateFin
                  ).toLocaleDateString()}
                </p>
              )}
            </Col>
            <Col className="check-installation">
              <p>
                Concessionaire : <strong>{installation.concessionaire}</strong>
              </p>
            </Col>
          </Row>
          <InstallationInfos installation={installation}/>
          <Row className="my-4">
            <Col>
              <strong>Adresse de l'installation :</strong>{" "}
              {installation.address}
            </Col>
          </Row>
          {installation.stockage && (
            <InstallationStockage
              capaciteBatterie={installation.capaciteBatterie}
              batteries={installation.batteries}
            />
          )}

          <InstallationOnduleurs onduleurs={installation.onduleurs} prof={installation.prof}/>
          <InstallationPanneaux panneaux={installation.panneaux} prof={installation.prof}/>
          <InstallationSupportage supportages={installation.systemeDeSupportage} prof={installation.prof}/>
        </>
      )}
    </>
  );
};

export default InstallationDetailsScreen;
