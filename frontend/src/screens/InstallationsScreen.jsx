import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import InstallationCard from "../components/installations/InstallationCard";

const InstallationsScreen = () => {
  const [installations, setInstallations] = useState([]);
  useEffect(() => {
    const fetchInstallations = async () => {
      const { data } = await axios.get("/api/installations");
      setInstallations(data);
    };
    fetchInstallations();
  }, []);


  
  return (
    <>
      <h1>Installations</h1>
      <Row>
        {installations.map((installation) => (
          <Col key={installation._id} sm={12} md={6} lg={4} xl={3}>
            <InstallationCard installation={installation} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default InstallationsScreen;
