import React, { useState } from 'react';
import Sidebar from '../../components/Layout/Sidebar/Sidebar';
import Navbar from '../../components/Layout/Navbar/Navbar';
import './Historique.css';

function Historique({ userName }) { 
  const [date, setDate] = useState("");
  const [capteur, setCapteur] = useState("all");
  const [noeud, setNoeud] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  
  const allData = [
    { date: '2026-03-27 12:00', temp: 24.5, hum: 58, air: 42, press: 669, capteur: 'DHT22', noeud: 'Node1' },
    { date: '2026-03-27 11:45', temp: 24.2, hum: 59, air: 40, press: 670, capteur: 'DHT22', noeud: 'Node2' },
    { date: '2026-03-27 11:30', temp: 23.9, hum: 60, air: 38, press: 672, capteur: 'MQ135', noeud: 'Node1' }
  ];

  const handleFilter = () => {
    const result = allData.filter(item => {
      return (
        (!date || item.date.startsWith(date)) &&
        (capteur === 'all' || item.capteur === capteur) &&
        (noeud === 'all' || item.noeud === noeud)
      );
    });
    setFilteredData(result);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
      
      {/* 1. SIDEBAR */}
      <div style={{ 
        width: isSidebarVisible ? '260px' : '0px', 
        transition: 'width 0.3s ease-in-out', 
        overflow: 'hidden',
        backgroundColor: '#1a1a2e',
        flexShrink: 0 
      }}>
        <Sidebar />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* NAVBAR avec contrôle de la sidebar */}
        <Navbar toggleSidebar={toggleSidebar} userName="Admin" />

        {/* CONTENU DE L'HISTORIQUE */}
        <main className="historique-content" style={{ padding: '30px', overflowY: 'auto', flex: 1 }}>
          <section className="content-header" style={{ marginBottom: '25px' }}>
            <div className="title-area">
              <h1 style={{ fontSize: '1.8rem', margin: '0 0 5px 0' }}>📋 Historique des Données</h1>
              <p style={{ color: '#64748b', margin: 0 }}>Accédez aux relevés archivés de vos capteurs</p>
            </div>
            
            <div className="filter-bar" style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input 
                type="date" 
                className="custom-date" 
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                onChange={(e) => setDate(e.target.value)}
              />

              <select 
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                onChange={(e) => setCapteur(e.target.value)}
              >
                <option value="all">Tous les capteurs</option>
                <option value="DHT22">DHT22</option>
                <option value="MQ135">MQ135</option>
                <option value="BMP280">BMP280</option>
              </select>

              <select 
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                onChange={(e) => setNoeud(e.target.value)}
              >
                <option value="all">Tous les noeuds</option>
                <option value="Node1">Node1</option>
                <option value="Node2">Node2</option>
              </select>

              <button 
                className="btn-primary" 
                onClick={handleFilter}
                style={{ padding: '10px 20px', background: '#1e2235', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Filtrer les données
              </button>
            </div>
          </section>

          {/* TABLEAU */}
          <div className="table-container" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '25px' }}>
            <table className="modern-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                  <th style={{ padding: '12px' }}>📅 Horodatage</th>
                  <th style={{ padding: '12px' }}>🌡️ Température</th>
                  <th style={{ padding: '12px' }}>💧 Humidité</th>
                  <th style={{ padding: '12px' }}>🌿 Qualité Air</th>
                  <th style={{ padding: '12px' }}>🧭 Pression</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px' }}>{item.date}</td>
                      <td style={{ padding: '12px' }}>{item.temp}°C</td>
                      <td style={{ padding: '12px' }}>{item.hum}%</td>
                      <td style={{ padding: '12px' }}>{item.air} ppm</td>
                      <td style={{ padding: '12px' }}>{item.press} Pa</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>Aucune donnée filtrée. Cliquez sur le bouton "Filtrer" pour commencer.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* GRAPHIQUE SVG */}
          {filteredData.length > 0 && (
            <div className="chart-container" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0 }}>📊 Aperçu Visuel (Température)</h3>
              <svg width="100%" height="200" style={{ border: '1px solid #f1f5f9', borderRadius: '8px' }}>
                {filteredData.map((item, index) => {
                  const x = index * 80 + 50;
                  const y = 180 - item.temp * 5;
                  return <circle key={index} cx={x} cy={y} r="6" fill="#1e2235" />;
                })}

                {filteredData.map((item, index) => {
                  if (index === 0) return null;
                  const prev = filteredData[index - 1];
                  const x1 = (index - 1) * 80 + 50;
                  const y1 = 180 - prev.temp * 5;
                  const x2 = index * 80 + 50;
                  const y2 = 180 - item.temp * 5;
                  return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e2235" strokeWidth="2" />;
                })}
              </svg>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Historique;
