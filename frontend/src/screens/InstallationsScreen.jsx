import { Row, Col } from "react-bootstrap";
import InstallationCard from "../components/installations/InstallationCard";
import { useGetInstallationsQuery } from "../slices/installationsApiSlice";
import { useGetThirdPartiesQuery } from "../slices/dolibarr/thirdpartiesApiSlice";

const InstallationsScreen = () => {
  const {
    data: installations = [],
    isLoading,
    error,
  } = useGetInstallationsQuery();
  const {
    data: thirparties = [],
    isLoading : isLoadingThirdparties,
    error : thirdpartiesError,
  } = useGetThirdPartiesQuery();

  console.log(thirparties);
  return (
    <>
    <div>{thirdpartiesError?.data?.message } </div>
      {isLoading ? (
        isLoading
      ) : error ? (
        <div>{error?.data?.message || error.error} </div>
      ) : (
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
      )}
    </>
  );
};

export default InstallationsScreen;
