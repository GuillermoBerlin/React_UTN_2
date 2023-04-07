import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap/'
import AuthContext from '../Context.js/AuthContext';


export default function Menu() {

  const context = useContext(AuthContext)

  //const [token, setToken] = useState(localStorage.getItem('token'));

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
  };

  

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav.Link as={Link} to="/"><Navbar.Brand href="#home">Onkel Node</Navbar.Brand></Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {!context.userLogged &&
              <>
              <Nav.Link as={Link} to="/alta">Registro</Nav.Link>
              <Nav.Link as={Link} to="/ingresar">Login</Nav.Link>
              </>
              }
              
              {context.userLogged &&
              <>
              <Nav.Link onClick={() => {
                removeTokenFromLocalStorage();
                context.logoutUser();
              }}>Logout</Nav.Link>  
              <Nav.Link as={Link} to="/products/newproduct">New Product</Nav.Link>
              </>
              }
                         
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
