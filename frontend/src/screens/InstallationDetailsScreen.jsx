import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useGetInstallationDetailsQuery,
  useUpdateInstallationMutation,
} from '../slices/installationsApiSlice'
import { Badge, Button, Col, Row, Toast } from 'react-bootstrap'
import { FaCheck, FaTimes } from 'react-icons/fa'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import ThirdPartyCard from '../components/ThirdPartyCard'
import InstallationStockage from '../components/InstallationStockage'
import InstallationOnduleurs from '../components/InstallationOnduleurs'
import InstallationPanneaux from '../components/InstallationPanneaux'
import InstallationInfos from '../components/InstallationInfos'

import InstallationSupportage from '../components/InstallationSupportage'
import { useCreateProposalMutation } from '../slices/dolibarr/dolliProposalApiSlice'

const InstallationDetailsScreen = () => {
  const { id: productId } = useParams()
  const dispatch = useDispatch()
  const {
    data: installation,
    isLoading,
    refetch,
    error,
  } = useGetInstallationDetailsQuery(productId)

  console.log(installation)
  const currentDate = new Date() // Obtient la date actuelle
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000) // Convertit en Unix Timestamp

  const [
    createProposal,
    { isLoading: isCreating, isError, isSuccess },
  ] = useCreateProposalMutation()

  const [
    updateInstallation,
    {
      isLoading: isUpdating,
      isError: errorUpdating,
      isSuccess: successUpdating,
    },
  ] = useUpdateInstallationMutation()

  const handleCreateProposal = async () => {
    // Préparez les données à envoyer pour la création de la proposition
    const proposalData = {
      socid: installation.demandeur,
      user_author_id: '1',
      date: unixTimestamp,
      array_options: {
        options_contact: '2',
        options_vente: '3',
      },
    }

    console.log(proposalData)

    try {
      const response = await createProposal({ proposalData }).unwrap()
      console.log('ID de la proposition créée:', response) // Remplacez "id" par le champ approprié si nécessaire

      // Mise à jour de l'installation avec le nouvel ID de proposition
      await updateInstallation({
        installationId: installation.id, // Assurez-vous que c'est le bon ID
        idPropal: response, // Utilisez le bon champ de l'objet de réponse
      })
      // Rafraîchir les données de l'installation
      refetch()
      toast.success(
        "La proposition et l'installation ont été mises à jour avec succès !",
      )
    } catch (error) {
      toast.error(
        "Échec de la création de la proposition ou de la mise à jour de l'installation",
      )
    }
  }

  return (
    <>
      <Link className="btn btn-light my-3" to={'/installations'}>
        Retour{' '}
      </Link>
<h2>Installation - {installation.refference}</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {installation.idPropal === null ? (
            <Button className="mx-2 btn-sm" onClick={handleCreateProposal}>
              Créer la proposition dans Dolibarr
            </Button>
          ) : (
            <p>
              Identifiant de la proposition commercial Dolibarr :{' '}
              <strong className='tag'>{installation.idPropal} </strong>{' '}
            </p>
          )}
          <Row className="my-4">
            <Col md={10}>
              <h5>Installation : {installation.refference}</h5>
              <p>
                <strong>Créer par : </strong> {installation.createdBy.name}{' '}
                <strong>le : </strong>{' '}
                {new Date(installation.createdAt).toLocaleDateString()}
              </p>
            </Col>
            <Col md={2}>
              <Badge style={{ marginRight: '10px' }}>
                {installation.status}
              </Badge>
              {installation.prof === true ? (
                <Badge variant="success">Professionnel</Badge>
              ) : (
                <Badge variant="success">Particullier</Badge>
              )}
            </Col>

            <Row className="my-4">
              <Col>
                <ThirdPartyCard
                  tierId={installation.demandeur}
                  title={'Demandeur'}
                />
              </Col>
              <Col>
                <ThirdPartyCard
                  tierId={installation.benneficiaire}
                  title={'benneficiare'}
                />
              </Col>
            </Row>
          </Row>
          <InstallationInfos installation={installation} />
          <Row className="my-4"></Row>
          {installation.stockage && (
            <InstallationStockage
              capaciteBatterie={installation.capaciteBatterie}
              batteries={installation.batteries}
            />
          )}

          <InstallationOnduleurs
            onduleurs={installation.onduleurs}
            prof={installation.prof}
          />
          <InstallationPanneaux
            panneaux={installation.panneaux}
            prof={installation.prof}
          />
          <InstallationSupportage
            supportages={installation.systemeDeSupportage}
            prof={installation.prof}
          />
        </>
      )}
    </>
  )
}

export default InstallationDetailsScreen
