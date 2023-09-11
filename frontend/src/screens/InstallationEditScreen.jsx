import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateInstallationMutation,
  useGetInstallationDetailsQuery,
} from "../slices/installationsApiSlice";
import { useGetThirdPartiesQuery } from "../slices/dolibarr/dolliThirdPartyApiSlice";

const InstallationEditScreen = () => {
  const { id: installationId } = useParams();

  const {
    data: tiers,
    isLoading: tiersLoading,
    error: errorTiers,
  } = useGetThirdPartiesQuery();

  console.log(tiers);
  // Informations générales
  const [typeInstallation, setTypeInstallation] = useState("");
  const [status, setStatus] = useState("");
  const [concessionaire, setConcessionaire] = useState("");
  // Contrat de maintenance actif
  const [isActive, setIsActive] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Demandeur et Bénéficiaire
  const [demandeurIdDolibarr, setDemandeurIdDolibarr] = useState("");
  const [demandeurRemarque, setDemandeurRemarque] = useState("");
  const [beneficiaireIdDolibarr, setBeneficiaireIdDolibarr] = useState("");
  const [beneficiaireRemarque, setBeneficiaireRemarque] = useState("");

  // Plus d'informations

  const [numCompteurEnercal, setNumCompteurEnercal] = useState(null);
  const [address, setAddress] = useState("");
  const [numClientEnercal, setNumClientEnercal] = useState(null);
  const [datePose, setDatePose] = useState(null);
  const [datePrevisionelMiseEnService, setDatePrevisionelMiseEnService] =
    useState(null);
  const [dateMiseEnService, setDateMiseEnService] = useState(null);

  // Gestion de la garantie
  const [garantie, setGarantie] = useState({
    actif: false,
    duree: 1,
    dateFin: null,
  });

  // Informations sur la demande (EEC, Enercal, Dimenc)
  const [demandeEEC, setDemandeEEC] = useState({
    date: null,
    dateReponse: null,
    status: "",
    remarque: "",
  });
  const [demandeEnercal, setDemandeEnercal] = useState({
    date: null,
    dateReponse: null,
    status: "",
    remarque: "",
  });
  const [demandeDimenc, setDemandeDimenc] = useState({
    date: null,
    dateAcusee: null,
    finDelaiRetraction: null,
    status: "",
    remarque: "",
  });

  // Conformité
  const [conformite, setConformite] = useState({ date: null, remarque: "" });

  // Informations techniques
  const [puissanceSouscrite, setPuissanceSouscrite] = useState(0);
  const [puissanceTotalOnduleur, setPuissanceTotalOnduleur] = useState(0);
  const [puissancePvEtHybrid, setPuissancePvEtHybrid] = useState(0);
  const [valeurBridagePuissance, setValeurBridagePuissance] = useState(0);
  const [valeurBridageReinjection, setValeurBridageReinjection] = useState(0);
  const [stockage, setStockage] = useState(false);
  const [capaciteBatterie, setCapaciteBatterie] = useState(0);

  // Tableaux pour les onduleurs, les systèmes de supportage et les batteries
  const [onduleurs, setOnduleurs] = useState([]);
  const [systemeDeSupportage, setSystemeDeSupportage] = useState([]);
  const [batteries, setBatteries] = useState([]);

  const {
    data: installation,
    isLoading,
    error,
    refetch,
  } = useGetInstallationDetailsQuery(installationId);

  const [updateInstallation, { isLoading: loadingUpdate }] =
    useUpdateInstallationMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (installation) {
      setStatus(installation.status);
      setConcessionaire(installation.concessionaire);
      setTypeInstallation(installation.typeInstallation);
    }
  }, [installation]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateInstallation({
        installationId,
        concessionaire,
        status,
        address,
        typeInstallation,
        garantie,
        demandeEEC,
        demandeEnercal,
        numCompteurEnercal,
        demandeDimenc,
        conformite,
        puissanceSouscrite,
        puissanceTotalOnduleur,
        puissancePvEtHybrid,
        valeurBridagePuissance,
        valeurBridageReinjection,
        stockage,
        capaciteBatterie,
        onduleurs,
        systemeDeSupportage,
        batteries,
      });
      toast.success("Installation mise à jour avec succès");
      refetch();
      navigate("/installations");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      <Link to={"/installations"}>
        <Button className="btn btn-light my-3">Retour</Button>
      </Link>
      <h4>Modifier l'installation</h4>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={4}>
                <Form.Group controlId="status" className="my-2">
                  <Form.Label>Statut</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="" disabled>
                      Choisir un statut
                    </option>
                    <option value="Etude">Etude</option>
                    <option value="En Service">En service</option>
                    <option value="Projet">Projet</option>
                    <option value="Sans Suite">Sans Suite</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="concessionaire" className="my-2">
                  <Form.Label>Concessionaire</Form.Label>
                  <Form.Select
                    value={concessionaire}
                    onChange={(e) => setConcessionaire(e.target.value)}
                  >
                    <option value="" disabled>
                      Choisir un concessionaire
                    </option>
                    <option value="EEC">EEC</option>
                    <option value="Enercal">Enercal</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="typeInstallations" className="my-2">
                  <Form.Label>Type d'installations</Form.Label>
                  <Form.Select
                    value={typeInstallation.raccordement}
                    onChange={(e) => setTypeInstallation(e.target.value)}
                  >
                    <option value="" disabled>
                      Choisir un type d'installation
                    </option>
                    <option value="Mono">Mono</option>
                    <option value="Tri">Tri</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <h5>addresse de l'installations</h5>
              <Col md={6}>
                <Form.Group controlId="address" className="my-2">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="demandeur" className="my-2">
                  <Form.Label>Demandeur</Form.Label>
                  <Form.Select>
                    <option value="" disabled>
                      selectionner
                    </option>

                    {tiersLoading ? (
                      <option disabled>Chargement...</option>
                    ) : errorTiers ? (
                      <option disabled>Erreur</option>
                    ) : (
                      tiers.map((tier) => {
                        return <option key={tier.id}>{tier.name}</option>;
                      })
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="demandeur" className="my-2">
                  <Form.Label>Benneficiaire</Form.Label>
                  <Form.Select>
                    <option value="" disabled>
                      selectionner
                    </option>

                    {tiersLoading ? (
                      <option disabled>Chargement...</option>
                    ) : errorTiers ? (
                      <option disabled>Erreur</option>
                    ) : (
                      tiers.map((tier) => {
                        return <option key={tier.id}>{tier.name}</option>;
                      })
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <h5>Garantie</h5>
              <Col md={4}>
                <Form.Group controlId="garantieActif" className="my-2">
                  <Form.Check
                    type="checkbox"
                    label="Garantie active"
                    checked={garantie.isActive}
                    onChange={(e) =>
                      setGarantie({ ...garantie, isActive: e.target.checked })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="garantieDuree" className="my-2">
                  <Form.Label>Durée de la garantie (ans)</Form.Label>
                  <Form.Control
                    type="number"
                    value={garantie.duree}
                    onChange={(e) =>
                      setGarantie({ ...garantie, duree: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="garantieDateFin" className="my-2">
                  <Form.Label>Date de fin de la garantie</Form.Label>
                  <Form.Control
                    type="date"
                    value={garantie.dateFin}
                    onChange={(e) =>
                      setGarantie({ ...garantie, dateFin: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <h5>Demande EEC</h5>
              <Col md={4}>
                <Form.Group controlId="demandeEECDate" className="my-2">
                  <Form.Label>Date de la demande</Form.Label>
                  <Form.Control
                    type="date"
                    value={demandeEEC.date}
                    onChange={(e) =>
                      setGarantie({
                        ...demandeEEC,
                        dateDemande: e.target.value,
                      })
                    }
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="demandeEECDateReponse" className="my-2">
                  <Form.Label>Date de la réponse</Form.Label>
                  <Form.Control
                    type="date"
                    value={demandeEEC.dateReponse}
                    onChange={(e) =>
                      setGarantie({
                        ...demandeEEC,
                        dateReponse: e.target.value,
                      })
                    }
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="demandeEECStatus" className="my-2">
                  <Form.Label>Statut</Form.Label>
                  <Form.Select>
                    <option value="" disabled>
                      Choisir un statut
                    </option>
                    <option value="En cours">En cours</option>
                    <option value="Accepté">Accepté</option>
                    <option value="Refusé">Refusé</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <h5>Demande Enercal</h5>
              <Col md={4}>
                <Form.Group controlId="demandeEnercalDate" className="my-2">
                  <Form.Label>Date de la demande</Form.Label>
                  <Form.Control
                    type="date"
                    value={demandeEnercal.dateReponse}
                    onChange={(e) =>
                      setGarantie({
                        ...demandeEnercal,
                        dateReponse: e.target.value,
                      })
                    }
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="demandeEECDateReponse" className="my-2">
                  <Form.Label>Date de la réponse</Form.Label>
                  <Form.Control
                    type="date"
                    value={demandeEEC.dateReponse}
                    onChange={(e) =>
                      setGarantie({
                        ...demandeEEC,
                        dateReponse: e.target.value,
                      })
                    }
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="demandeEnercalStatus" className="my-2">
                  <Form.Label>Statut</Form.Label>
                  <Form.Select>
                    <option value="" disabled>
                      Choisir un statut
                    </option>
                    <option value="En cours">En cours</option>
                    <option value="Accepté">Accepté</option>
                    <option value="Refusé">Refusé</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="primary" className="my-2">
              Mettre à jour
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default InstallationEditScreen;
