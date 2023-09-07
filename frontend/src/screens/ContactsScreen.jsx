import React from 'react';
import { useGetContactsQuery } from '../slices/dolibarr/dolliApiSlice';
import { Button, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEye } from 'react-icons/fa';

function ContactsScreen() {
    const { data, isLoading, error, refetch } = useGetContactsQuery();

    console.log(data);

    return (
        <Row>
            <h1>Contacts</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {typeof error.data.message === 'string' ? error.data.message : 'Une erreur est survenue'}
                </Message>
            ) : (
                <>
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Adresse</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((contact) => (
                                <tr key={contact.id}>
                                    <td>{contact.id}</td>
                                    <td>{contact.lastname}</td>
                                    <td>{contact.firstname}</td>
                                    <td>{contact.address || 'N/A'}</td>
                                    <td>{contact.email}</td>
                                    <td>
                                        <LinkContainer to={`/contact/${contact.id}`}>
                                            <Button variant="success" className="btn-sm mx-2">
                                                <FaEye />
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </Row>
    );
}

export default ContactsScreen;
