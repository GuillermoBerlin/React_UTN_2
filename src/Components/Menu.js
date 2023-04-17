import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap/';
import AuthContext from '../Context.js/AuthContext';

export default function Menu() {

  const context = useContext(AuthContext);

  useEffect(() => {
    context.initUser();
  }, []);

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
  };

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    context.logoutUser();
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/" className="nav-link">
            <Navbar.Brand>Onkel Node</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">Home</Link>
              {!context.userLogged && (
                <>
                  <Link to="/alta" className="nav-link">Registro</Link>
                  <Link to="/ingresar" className="nav-link">Login</Link>
                </>
              )}
              {context.userLogged && (
                <>
                  <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
                  <Link to="/products/newproduct" className="nav-link">New Product</Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

