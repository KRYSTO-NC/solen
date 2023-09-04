import {Row, Col} from 'react-bootstrap'
import installations from '../installations'
import InstallationCard from '../components/installations/InstallationCard'

const InstallationsScreen = () => {
  return (
    <>
      <h1>Installations</h1>
      <Row>
        {installations.map(installation => (
          <Col key={installation._id} sm={12} md={6} lg={4} xl={3}>
            <InstallationCard installation={installation} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default InstallationsScreen