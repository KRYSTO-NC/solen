import React, { useState, useEffect } from "react";
import {
  useGetInstallationDetailsQuery,
  useUpdateInstallationMutation,
} from "../../../../../slices/installationsApiSlice";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../../../../slices/dolibarr/dolliProductApiSlice";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import Loader from "../../../../../components/Loader";
import Message from "../../../../../components/Message";

const Step9 = ({ installation, onNext }) => {
  const { data: simmulation } = useGetInstallationDetailsQuery(installation);
  console.log(simmulation);
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery();



  return (
    <>
      <div className="heading">
        <h1>installation créer avec succées : {simmulation.refference}</h1>
      </div>
     
    </>
  );
};

export default Step9;
