import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import Menu from './Components/Menu';
import Registro from './Pages/Registro';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Menu/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/alta" element={<Registro/>}/>
      </Routes>
    </Router>
  );
}

export default App;
