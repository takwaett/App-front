import logo from './assets/logo.png';
import {useState} from 'react';
import Login from './pages/Signin/signin';
import { BrowserRouter, Routes, Route, Navigate}  from 'react-router-dom';
import Inscription from './pages/Signup/signup';
import Dashboard from './pages/Dashboard/Dashboard'; 
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import Alertes from './pages/Alertes/Alertes';
import Historique from './pages/Historique/Historique';
import Graphiques from './pages/Graphiques/Graphiques';
import Configuration from './pages/Configuration/Configuration';
import User from './pages/User/User';
import Notification from './components/Notification/Notification';

function App() {

  const [userName, setUserName] = useState(localStorage.getItem('userName') || "Utilisateur");


  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
   
    <Route path="/" element={<Login setUserName={setUserName} />} />
    <Route path="/signin" element={<Navigate to="/" replace />} />
    <Route path="/signup" element={<Inscription />} />
    <Route path="/Forgot-password" element={<ForgetPassword />} />
    
    {/* 2. Passer userName à TOUTES les autres pages */}
    <Route path="/dashboard" element={<Dashboard userName={userName} />} />
    <Route path="/profil" element={<User userName={userName} setUserName={setUserName} />} />
    
    <Route path="/alertes" element={<Alertes userName={userName} />} />
    <Route path="/graphiques" element={<Graphiques userName={userName} />} />
    <Route path="/historique" element={<Historique userName={userName} />} />
    <Route path="/configuration" element={<Configuration userName={userName} />} />
</Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
