import { useState, useEffect } from 'react'
import { Table, Form, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaTimes } from 'react-icons/fa'
import { useProfileMutation } from '../slices/userApiSlice'

import { setCredentials } from '../slices/authSlice'


const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const userInfos = useSelector((state) => state.auth.userInfo)

  const [
    updateProfile,
    { isLoading: loadingUpdateProfile},
  ] = useProfileMutation()


  useEffect(() => {
    if (userInfos) {
      setName(userInfos.name)
      setEmail(userInfos.email)
    }
  }, [ userInfos, userInfos.name, userInfos.email])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
    } else {
     try {
        const res = await updateProfile({ _id:userInfos._id ,name,email,password}).unwrap()
        dispatch(setCredentials(res))
        toast.success('Profile mis à jour')
     } catch (error) {
        toast.error(error?.data.message || error?.error)
     }
    }
  }

  return (
    <Row>
      <Col md={6} className='my-5'>
        <h2>Votre profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Nom</Form.Label>

            <Form.Control
              type="name"
              placeholder="Entrer votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Adresse email</Form.Label>

            <Form.Control
              type="email"
              placeholder="Entrer votre addresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Mot de passe</Form.Label>

            <Form.Control
              type="password"
              placeholder="Entrer votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Confirmer votre mot de passe</Form.Label>

            <Form.Control
              type="password"
              placeholder="Confirmer votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Mettre à jour
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
     
    </Row>
  )
}

export default ProfileScreen
