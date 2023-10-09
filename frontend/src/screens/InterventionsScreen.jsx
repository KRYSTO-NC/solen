import React from 'react';
import { Table, Badge, Button } from "react-bootstrap";
import { useGetInstallationsQuery } from '../slices/installationsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEye, FaEyeDropper } from 'react-icons/fa';

const InterventionsScreen = () => {
  const { data: installations, isLoading, error, refetch } = useGetInstallationsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Liste des interventions</h1>
      <Table striped hover responsive className="table-sm">
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
          {installations.installations && installations.installations.length > 0 ? (
            installations.installations.map((installation) => (
              installation.interventions.map((intervention, i) => (
                
                <tr key={i}>
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
              ))
            ))
          ) : (
            <tr>
              <td colSpan="3">Aucune interventions</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default InterventionsScreen;
