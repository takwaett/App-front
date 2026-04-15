import logo from './assets/logo.png';
import {useState} from 'react';
import Login from './pages/Signin/signin';
import { BrowserRouter,Routes,Route,Navigate}  from 'react-router-dom';
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
  const [userName, setUserName] = useState("Admin EnviroSense");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
           <Route path="/Login" element={<Navigate to="/" replace />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Forgot-password" element={<ForgetPassword />} />
          <Route path="/se-connecter" element={<seconnecter/> } /> 
          <Route path="/alertes" element={<Alertes />} />
          <Route path="/graphiques" element={<Graphiques />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/Profil" element={<User />} />
           <Route path="/dashboard" element={<Dashboard userName={userName} />} />
           <Route path="/profil" element={<User userName={userName} setUserName={setUserName} />} />

           </Routes>
      </BrowserRouter>
     
   
    </div>
  );
}

export default App;
