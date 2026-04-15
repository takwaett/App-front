import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navbar from '../../components/Layout/Navbar/Navbar';
import Sidebar from '../../components/Layout/Sidebar/Sidebar';
import Body from '../../components/Layout/Body/Body';
import { getUserProfile } from '../../services/authService';

function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserProfile();
        // Si le service renvoie des données valides
        if (data) {
          setUser(data);
        } else {
          // Si pas de données (ex: token invalide), retour login
          navigate('/login');
        }
      } catch (err) {
        console.error("Erreur d'accès au dashboard", err);
        navigate('/login');
      } finally {
        setLoading(false); // On arrête le chargement quoi qu'il arrive
      }
    };
    loadProfile();
  }, [navigate]);

  // Si on est encore en train de récupérer les données, on n'affiche rien ou un spinner
  // Cela évite de voir "Bienvenue undefined" pendant une demi-seconde
  if (loading) {
    return <div className="loading-screen">Chargement du profil...</div>;
  }

  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      
      <Sidebar />

      <div className="main-area">  
        {/* On passe l'objet user complet à la Navbar */}
        <Navbar 
          toggleSidebar={toggleSidebar} 
          user={user} 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        {/* On passe l'objet user au Body pour le "Bienvenue [Prénom]" */}
        <Body user={user}/>
      </div>
    </div>
  );
}

export default Dashboard;
