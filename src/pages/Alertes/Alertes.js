import React, { useState } from 'react';
import './Alertes.css';
import Sidebar from '../../components/Layout/Sidebar/Sidebar';
import Navbar from '../../components/Layout/Navbar/Navbar'; // Import ajouté

function Alertes() {
  const [gravite, setGravite] = useState("all");
  const [nonLusSeulement, setNonLusSeulement] = useState(false);
  
  // État pour la Sidebar (harmonisé avec tes autres pages)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); 

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const allAlerts = [
    { id: 1, date: '2026-03-27T12:00', message: 'Température critique !', capteur: 'DHT22', gravite: 'Urgent', lu: false },
    { id: 2, date: '2026-03-27T11:45', message: 'Humidité basse', capteur: 'DHT22', gravite: 'Moyen', lu: true },
    { id: 3, date: '2026-03-27T11:30', message: "Qualité de l'air mauvaise", capteur: 'MQ135', gravite: 'Info', lu: false }
  ];

  const [filteredAlerts, setFilteredAlerts] = useState(allAlerts);

  const handleFilter = () => {
    const result = allAlerts.filter(item => {
      const matchGravite = gravite === 'all' || item.gravite === gravite;
      const matchNonLu = !nonLusSeulement || item.lu === false;
      return matchGravite && matchNonLu;
    });
    setFilteredAlerts(result);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
      
      {/* 1. SIDEBAR */}
      <div 
        style={{ 
          width: isSidebarVisible ? '260px' : '0px', 
          backgroundColor: '#1a1a2e', 
          transition: 'width 0.3s ease-in-out',
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        <Sidebar />
      </div>

      {/* 2. ZONE PRINCIPALE (Navbar + Contenu) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* NAVBAR : Ajoutée pour piloter la sidebar et afficher le profil */}
        <Navbar toggleSidebar={toggleSidebar} userName="Admin" />

        <main style={{ padding: '30px', overflowY: 'auto', flex: 1 }}>
          <section className="content-header">
            <h1 style={{ margin: '0 0 5px 0', fontSize: '1.8rem', color: '#1e293b' }}>🚨 Alertes</h1>
            <p style={{ margin: 0, color: '#64748b' }}>Liste des alertes détectées par le système EnviroSense</p>
            
            {/* BARRE DE FILTRES */}
            <div className="filter-bar" style={{ 
              display: 'flex', 
              gap: '20px', 
              alignItems: 'center', 
              margin: '25px 0',
              padding: '15px',
              background: 'white',
              borderRadius: '10px',
              border: '1px solid #e2e8f0'
            }}>
              <select 
                value={gravite} 
                onChange={(e) => setGravite(e.target.value)} 
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              >
                <option value="all">Toutes les gravités</option>
                <option value="Urgent">Urgent</option>
                <option value="Moyen">Moyen</option>
                <option value="Info">Info</option>
              </select>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', color: '#475569' }}>
                <input 
                  type="checkbox" 
                  checked={nonLusSeulement} 
                  onChange={(e) => setNonLusSeulement(e.target.checked)} 
                  style={{ width: '18px', height: '18px' }}
                />
                Afficher uniquement les non lus
              </label>

              <button 
                onClick={handleFilter} 
                style={{ 
                  padding: '10px 25px', 
                  cursor: 'pointer', 
                  backgroundColor: '#1e2235', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.target.style.opacity = '0.9'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                Appliquer les filtres
              </button>
            </div>
          </section>

          {/* TABLEAU DES ALERTES */}
          <div className="table-container" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '14px' }}>
                  <th style={{ padding: '15px' }}>Statut</th>
                  <th style={{ padding: '15px' }}>📅 Horodatage</th>
                  <th style={{ padding: '15px' }}>🔥 Gravité</th>
                  <th style={{ padding: '15px' }}>⚠️ Message</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <tr key={alert.id} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.2s' }}>
                      <td style={{ padding: '15px', fontSize: '20px' }}>{alert.lu ? '📖' : '📩'}</td>
                      <td style={{ padding: '15px', color: '#334155' }}>{new Date(alert.date).toLocaleString('fr-FR')}</td>
                      <td style={{ padding: '15px' }}>
                        <span style={{ 
                          padding: '5px 12px', 
                          borderRadius: '20px', 
                          fontSize: '11px', 
                          fontWeight: 'bold',
                          background: alert.gravite === 'Urgent' ? '#fee2e2' : alert.gravite === 'Moyen' ? '#ffedd5' : '#f1f5f9',
                          color: alert.gravite === 'Urgent' ? '#ef4444' : alert.gravite === 'Moyen' ? '#f59e0b' : '#64748b'
                        }}>
                          {alert.gravite.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '15px', fontWeight: alert.lu ? 'normal' : 'bold', color: '#1e293b' }}>
                        {alert.message}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      Aucune alerte ne correspond à vos critères.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Alertes;
