import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import installations from "../installations";

const InstallationScreen = () => {
  // get the id from the url
  const { id } = useParams();
  // find the installation with the id
  const installation = installations.find(
    (installation) => installation._id === id
  );
  console.log(installation);

  return (
    <>
      <Link className="btn btn-light my-3" to="/installations">
        Retour
      </Link>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{installation.refference}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>{installation.address}</h5>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Col>
                  <Badge>{installation.status}</Badge>
                </Col>
                <Col>Concessionaire : {installation.concessionaire}</Col>
                <Col>Garantie : {installation.garantie.duree} ans</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong> Stockage:</strong>
                  </Col>
                  <Col>
                    <strong>
                      {installation.stockage ? <p>Oui</p> : <p>Non</p>}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
                <ListGroup.Item>
                    <Button className="btn-block">Créer une demande d'intervention</Button>
                </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InstallationScreen;
