import { Card, Badge } from "react-bootstrap";
import {Link} from 'react-router-dom'


const InstallationCard = ({ installation }) => {
  return (
    <Card className="my-3 p-3 rounded position-relative">
      <Badge
        className="position-absolute"
        style={{ top: "10px", right: "10px" }}
      >
        {installation.status}
      </Badge>
      <Link to={`/installation/${installation._id}`}>
        <Card.Body>
          <Card.Title as="div">
            <strong>{installation.refference}</strong>
          </Card.Title>
        </Card.Body>
      </Link>
      <Card.Text as="div">
        <p>{installation.address}</p>
      </Card.Text>
    </Card>
  );
};

export default InstallationCard;
