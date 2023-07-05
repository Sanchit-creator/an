import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path='/' element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
