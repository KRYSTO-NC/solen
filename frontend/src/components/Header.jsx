import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaSolarPanel, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../assets/logo.png'
const Header = () => {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect >
            <Container>
                <LinkContainer to='/'>

                <Navbar.Brand>
                    <img src={logo} alt="Solen logo"  style={{marginRight: "8px"}}/>
                    Solen</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className='ms-auto'>
                    <LinkContainer to={"/installations"}>
                    <Nav.Link href="/"><FaSolarPanel style={{marginRight:"8px"}}/>Installations</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={"/"}>
                    <Nav.Link><FaUser style={{marginRight:"8px"}}/>Connexion</Nav.Link>
                    </LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header