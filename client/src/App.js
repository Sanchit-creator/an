import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Verify from './components/Verify';
import Home from './components/Home';

function App() {
  const user = localStorage.getItem('userInfo')
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={!user &&<SignIn />} />
          <Route path='/signup'element={!user && <SignUp />} />
          <Route path='/verify/:params' element={<Verify />} /> 
          <Route path='/home/:paramstwo' element={user && <Home />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
