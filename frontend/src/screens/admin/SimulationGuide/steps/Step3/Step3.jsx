import React, { useEffect, useState } from "react";
import { useGetThirdPartiesQuery } from "../../../../../slices/dolibarr/dolliThirdPartyApiSlice";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import { Button, Col, Row, Table } from "react-bootstrap";
import SearchBar from "../../../../../components/SearchBar";
import { FaCheck, FaEdit, FaPlusCircle, FaTimes } from "react-icons/fa";
import {
  useGetInstallationDetailsQuery,
  useUpdateInstallationMutation,
} from "../../../../../slices/installationsApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

const Step3 = ({ installation, onNext  })  => {
  const [selectedThirdParty, setSelectedThirdParty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: simulation,
    isLoading,

    error,
  } = useGetInstallationDetailsQuery(installation);

  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateInstallationMutation();

  const {
    data: tiers,
    isLoading: loadingTiers,
    error: errorTiers,
  } = useGetThirdPartiesQuery();


  const handleValidate = async () => {
    try {
      await updateInstallation({
        installationId: installation,
        benneficiaire: selectedThirdParty.id, 
      });
      toast.success("Bennéficiaire ajouté avec succées.");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la validation de l'installation.");
      console.error("Une erreur est survenue:", error);
    }
  };
  
  // Ajout d'un useEffect pour gérer la réussite de la mise à jour
  useEffect(() => {
    if (isSuccess) {
      onNext(installation); // ou handleNext(installation) si vous renommez la prop
    }
  }, [isSuccess, onNext, installation]);


  const filteredTiers = tiers?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  
  );
   




  console.log(simulation);

  return (
    <>
      <h1>Benneficiaire</h1>
      <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
      {isLoading || loadingTiers ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Adresse</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredTiers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>

                    <td>
                      {user.email ? (
                        <td>
                          {" "}
                          <a href={`mailto: ${user.email}`}>{user.email}</a>
                        </td>
                      ) : (
                        <td style={{ color: "red" }}> Non renseignée</td>
                      )}
                    </td>

                    {user.address ? (
                      <td> {user.address}</td>
                    ) : (
                      <td style={{ color: "red" }}> Non renseignée</td>
                    )}
                    <td>
                      <>
                        <Button
                          variant="success"
                          className="btn-sm"
                          onClick={() => setSelectedThirdParty(user)}
                        >
                          <FaPlusCircle />
                        </Button>
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col md={4}>
            {selectedThirdParty ? (
              <>
                <h3>Selection:</h3>
                <p>
                  <strong>Nom :</strong>{" "}
                  {selectedThirdParty.name || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Email :</strong>{" "}
                  {selectedThirdParty.email || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Adresse :</strong>{" "}
                  {selectedThirdParty.address || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Code postal :</strong>{" "}
                  {selectedThirdParty.zip || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Ville :</strong>{" "}
                  {selectedThirdParty.town || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Téléphone :</strong>{" "}
                  {selectedThirdParty.phone || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Mobile :</strong>{" "}
                  {selectedThirdParty.phone_mobile || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
              </>
            ) : (
              <p>Veuillez sélectionner un tiers pour voir les détails.</p>
            )}
            <Button variant="primary" onClick={handleValidate}>
              Valider
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Step3;
