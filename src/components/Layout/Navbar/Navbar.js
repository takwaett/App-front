import { useState } from 'react'; // On enlève useEffect qui est devenu inutile ici
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Notification from '../../../components/Notification/Notification';

// ON RÉCUPÈRE 'user' DEPUIS LES PROPS (envoyé par Dashboard)
function Navbar({ toggleSidebar, user }) { 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // PLUS BESOIN de useEffect ni de loadData ici car Dashboard le fait déjà !

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const target = searchTerm.toLowerCase().trim();
      const routes = {
        "dashboard": "/dashboard",
        "graphiques": "/graphiques",
        "alertes": "/alertes",
        "profil": "/profil"
      };

      if (routes[target]) {
        navigate(routes[target]);
        setSearchTerm("");
      }
    }
  };

  return (
    <div className="header-right" style={{ 
      position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white', 
      width: '100%', display: 'flex', alignItems: 'center', 
      justifyContent: 'space-between', padding: '0 20px', 
      height: '70px', borderBottom: '1px solid #e2e8f0' 
    }}>
      <div className="navbar-left">
        <button 
          className="burger-icon" 
          onClick={toggleSidebar} 
          style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
        >
          ☰
        </button>
        <div className="navbar-titles">
          <h2 style={{ margin: 0 }}>EnviroSense</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
            {/* Utilisation directe du user passé par le Dashboard */}
            Bienvenue, {user ? `${user.prenom}` : "Chargement..."} 👋
          </p>
        </div>
      </div>

      <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="🔍 Rechercher..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            onKeyDown={handleSearch} 
          />
        </div>
        
        <Notification />
        
        <div 
          className="user-profile" 
          onClick={() => navigate('/profil')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div className="user-details" style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontWeight: '600' }}>
              {/* Affichage nom et prénom direct */}
              {user ? `${user.prenom} ${user.nom}` : "Utilisateur"}
            </p>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'capitalize' }}>
              {user?.role || "Chargement..."}
            </span>
          </div>
          <div className="avatar" style={{ background: '#f1f5f9', padding: '8px', borderRadius: '50%' }}>
            👤
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
