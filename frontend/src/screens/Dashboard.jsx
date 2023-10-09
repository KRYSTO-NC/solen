import React, { useState, useEffect } from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useGetInstallationsQuery } from '../slices/installationsApiSlice';

const Dashboard = () => {
  
  const { data: installationsData, isLoading, error, refetch } = useGetInstallationsQuery();
  const [countByStatus, setCountByStatus] = useState({});
  const [interventionsInDelay, setInterventionsInDelay] = useState(0);

  useEffect(() => {
    if (installationsData) {
      const installationsArray = installationsData.installations || [];
      const newCount = installationsArray.reduce((acc, curr) => {
        const { status } = curr;
        acc[status] = acc[status] ? acc[status] + 1 : 1;
        return acc;
      }, {});

      setCountByStatus(newCount);

      // Compter les interventions en retard
      const delayedInterventions = installationsArray.reduce((total, currInstallation) => {
        const interventionsArray = currInstallation.interventions || [];
        const delayedCount = interventionsArray.filter(intervention => intervention.status === 'Retard').length;
        return total + delayedCount;
      }, 0);

      setInterventionsInDelay(delayedInterventions);
    }
  }, [installationsData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h2>Dashboard</h2>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Nombre d'installations :  {installationsData.installations.length}</Card.Title>
              <Card.Text>
                {Object.keys(countByStatus).map((status) => (
                  <Badge style={{marginRight:"10px"}} key={status}>
                    {status}: {countByStatus[status]}
                  </Badge>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Interventions sur installation</Card.Title>
              <Card.Text>
                Interventions en retard :  <Badge style={{marginLeft:"15px"}} > {interventionsInDelay}</Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
       
      </Row>
    </>
  );
}

export default Dashboard;
