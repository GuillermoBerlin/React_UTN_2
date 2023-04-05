import './App.css';
import Home from './Pages/Home';
import Menu from './Components/Menu';
import Registro from './Pages/Registro';
import Login from './Pages/Login';
import Detalle from './Pages/Detalle';
import NewProduct from './Pages/NewProduct';
import ModifyProduct from './Pages/ModifyProduct';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import AuthProvider from './Context.js/AuthProvider';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Menu/>
      <Container>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/alta" element={<Registro/>}/>
        <Route path="/ingresar" element={<Login/>}/>
        <Route path="/products/:id" element={<Detalle/>}/>
        <Route path="/products/newproduct" element={<NewProduct/>}/>
        <Route path="/products/modifyproduct/:id" element={<ModifyProduct/>}/>
      </Routes>
      </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
