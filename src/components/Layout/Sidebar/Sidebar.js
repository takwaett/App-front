import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'; // Vérifie que le chemin est correct

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-section">
        <img src={logo} alt="Logo" />
        <div className="logo-text">
          <h1>EnviroSense</h1>
          <p>IoT Dashboard</p>
        </div>
      </div>
      <nav className="nav-menu">
        <p className="nav-title">NAVIGATION</p>
        <ul>
          <li className="active"><Link to="/dashboard">📊 Dashboard</Link></li>
          <li><Link to="/graphiques">📈 Graphiques</Link></li>
          <li><Link to="/historique">📋 Historique</Link></li>
          <li><Link to="/alertes">🔔 Alertes </Link></li>
          <li><Link to="/configuration">⚙️ Configuration</Link></li>
        </ul>
        <p className="nav-title">COMPTE</p>
        <ul>
          <li><Link to="/profil">👤 Profil Utilisateur</Link></li>
          <li><Link to="/login">↪️ Déconnexion</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
