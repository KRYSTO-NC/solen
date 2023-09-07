import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container,  NavDropdown } from "react-bootstrap";
import { FaPhone, FaSolarPanel, FaUser, FaUserAltSlash, FaUserTimes, FaWrench } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

import logo from "../assets/logo.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              <img className="header-logo" src={logo} alt="" /> SOLEN
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navabar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                 <LinkContainer to={"/installations"}>
                 <Nav.Link>
                   {" "}
                   <FaSolarPanel /> Installations
                 </Nav.Link>
               </LinkContainer>
                 <LinkContainer to={"/interventions"}>
                 <Nav.Link>
                   {" "}
                   <FaWrench/> Interventions
                 </Nav.Link>
               </LinkContainer>
                 <LinkContainer to={"/contacts"}>
                 <Nav.Link>
                   {" "}
                   <FaPhone/> contacts
                 </Nav.Link>
               </LinkContainer>
                <NavDropdown title={userInfo?.name} id="username">
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item> <FaUser/> Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                   <FaUserAltSlash/> Deconnexion
                  </NavDropdown.Item>
                </NavDropdown>
                </>
              ) : (
                <LinkContainer to={"/"}>
                  <Nav.Link>
                    {" "}
                    <FaUser /> se connecter
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to={"/admin/userlist"}>
                    <NavDropdown.Item> <FaUserTimes/> Utilisteurs</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
