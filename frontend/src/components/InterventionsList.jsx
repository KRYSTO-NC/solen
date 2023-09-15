import React from "react";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const InterventionsList = ({ interventions }) => {
  return (
    <>
      <h2>Intervention sur l'installation ({interventions.length})</h2>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Statut</th>
            <th>Demande</th>
            <th>Date prévisionnelle</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {interventions.map((intervention) => (
            <tr key={intervention.id}>
              <td>{intervention.id}</td>
              <td>
                <p className={`tag ${intervention.status}`}>
                  {intervention.status}
                </p>
              </td>
              <td>{new Date(intervention.dateDemande).toLocaleDateString()}</td>
              <td>
                {new Date(intervention.datePrevisionnelle).toLocaleDateString()}
              </td>
              <td>
                <LinkContainer to={`/intervention/${intervention.id}`}>
                  <Button variant="success" className="btn-sm mx-2">
                    <FaEye />
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InterventionsList;
