import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetContactDetailsQuery } from "../slices/dolibarr/dolliContactApiSlice";
import { Badge } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ContactDetailsScreen = () => {
  const { id: contactId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: contact,
    isLoading,
    refetch,
    error,
  } = useGetContactDetailsQuery(contactId);
  console.log(contact);

  function decodeHtmlEntities(str) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  let decodedStatus = "Statut non disponible";
  if (contact && contact.statut_commercial != null) {
    decodedStatus = decodeHtmlEntities(contact.statut_commercial);
  }

  return (
    <>
   

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {typeof error.data.message === "string"
            ? error.data.message
            : "Une erreur est survenue"}
        </Message>
      ) : (
        <>
           <h2>
        {contact.lastname} {contact.firstname}
      </h2>
      {!contact || !contact.statut_commercial ? (
            <p>Statut non renseigné</p>
          ) : (
            <Badge>{decodedStatus}</Badge>
          )}

          <p>{contact.email}</p>
          {!contact.address ? (
            <p>Adresse non renseignée</p>
          ) : (
            <p>
              Adresse : <strong>{contact.address}</strong>{" "}
            </p>
          )}
          {!contact.phone_mobil ? (
            <p>Télephone mobil non renseigné</p>
          ) : (
            <p>
              Adresse : <strong>{contact.address}</strong>{" "}
            </p>
          )}
        </>
      )}
    </>
  );
};

export default ContactDetailsScreen;
