import './App.css';
import Home from './Pages/Home';
import Menu from './Components/Menu';
import Registro from './Pages/Registro';
import Login from './Pages/Login';
import Detalle from './Pages/Detalle';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Menu/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/alta" element={<Registro/>}/>
        <Route path="/ingresar" element={<Login/>}/>
        <Route path="/producto/:id" element={<Detalle/>}/>
      </Routes>
    </Router>
  );
}

export default App;
