import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Badge } from "react-bootstrap";
import { FaEdit, FaExclamation, FaEye, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetInstallationsQuery,
  useCreateInstallationMutation,
  useDeleteInstallationMutation,
} from "../slices/installationsApiSlice";
import { toast } from "react-toastify";
import Paginate from "../components/Paginate";
import { useState } from "react";

const InstallationListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetInstallationsQuery({
    pageNumber,
  });

  const hasDelayedIntervention = (interventions) => {
    return interventions.some(
      (intervention) => intervention.status === "Retard"
    );
  };

  const [selectedStatus, setSelectedStatus] = useState("En Service");

  const [deleteInstallation, { isLoading: loadingDelete }] =
    useDeleteInstallationMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Voulez-vous supprimer cette installation ?")) {
      try {
        await deleteInstallation(id);
        toast.success("Installation supprimé avec succès");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Installations</h2>
        </Col>
        <Col className="text-end">
          <p>
            Initialement, seules les installations <strong>en service</strong>  apparaissent dans
            la liste. Pour voir des installations avec d'autres états, utilisez
            le menu déroulant ci-dessous.
          </p>

          <select
            className="select-filter"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="En Service">En service</option>
            <option value="Projet">Projet</option>
            <option value="Simulation">Simulation</option>
            <option value="Sans Suite">Sans suite</option>
          </select>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Refference</th>
                <th>Status</th>
                <th>Concessionaire</th>
                <th>Adresse</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.installations
                ?.filter(
                  (installation) =>
                    !selectedStatus || installation.status === selectedStatus
                )
                .map((installation) => (
                  <tr key={installation._id}>
                    <td>{installation.refference}</td>
                    <td>
                      {installation.status}
                      {hasDelayedIntervention(installation.interventions) && (
                        <span style={{ marginLeft: "10px" }}>
                          <Badge
                            style={{ color: "white", backgroundColor: "blue" }}
                          >
                            <FaExclamation /> Retard sur intervention{" "}
                            <FaExclamation />
                          </Badge>
                        </span>
                      )}
                    </td>
                    <td>{installation.concessionaire}</td>
                    <td>{installation.address}</td>
                    <td>
                      <LinkContainer to={`/installation/${installation._id}`}>
                        <Button variant="success" className="btn-sm mx-2">
                          <FaEye />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm mx-2"
                        onClick={() => deleteHandler(installation._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default InstallationListScreen;
