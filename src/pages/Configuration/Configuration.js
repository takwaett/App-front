import React, { useState } from 'react';
import Sidebar from '../../components/Layout/Sidebar/Sidebar';
import Navbar from '../../components/Layout/Navbar/Navbar';
import './Configuration.css';

function Configuration() {
  const [tempMax, setTempMax] = useState(30);
  const [humMax, setHumMax] = useState(60);
  const [isScanning, setIsScanning] = useState(false);
  
  // État pour gérer l'affichage de la sidebar
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); 

  // Cette fonction bascule l'état
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const [devices, setDevices] = useState([
    { id: 1, name: "Capteur température et humidité", type: "DHT22" },
    { id: 2, name: "Capteur de pression", type: "BMP280" },
    { id: 3, name: "Capteur Qualité de l'air", type: "MQ-135" },
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newId = devices.length + 1;
      setDevices([...devices, { id: newId, name: "Nouveau Capteur détecté", type: "MQ7-Sensor" }]);
      setIsScanning(false);
    }, 1500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("✅ Configuration enregistrée !");
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
      
      {/* SIDEBAR */}
      <div 
        style={{ 
          width: isSidebarExpanded ? '260px' : '0px', 
          backgroundColor: '#1a1a2e', 
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          flexShrink: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Sidebar />
      </div>

      {/* ZONE PRINCIPALE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* CORRECTION : On utilise le nom de prop "toggleSidebar" attendu par ton composant Navbar */}
        <Navbar toggleSidebar={toggleSidebar} userName="Admin" />

        <main style={{ padding: '30px', overflowY: 'auto', flex: 1 }}>
          <header style={{ marginBottom: '30px' }}>
            <h1 style={{ margin: '0 0 5px 0', fontSize: '1.8rem', color: '#1e293b' }}>⚙️ Configuration Système</h1>
            <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>Gérez vos seuils d'alerte et vos appareils connectés.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
            
            {/* BLOC PARAMÈTRES */}
            <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
              <h4 style={{ margin: '0 0 20px 0', color: '#1e2235' }}>Paramètres et Seuils</h4>
              <form onSubmit={handleSave}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>Alerter si Température &gt; (°C) :</label>
                  <input type="number" value={tempMax} onChange={(e) => setTempMax(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>Alerter si Humidité &gt; (%) :</label>
                  <input type="number" value={humMax} onChange={(e) => setHumMax(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '14px', background: '#1e2235', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                  💾 Sauvegarder les seuils
                </button>
              </form>
            </div>

            {/* BLOC APPAREILS */}
            <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h4 style={{ margin: 0, color: '#1e2235' }}>Appareils Actifs</h4>
                <button onClick={handleScan} disabled={isScanning} style={{ padding: '10px 18px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  {isScanning ? 'Scan...' : '+ Ajouter'}
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {devices.map(device => (
                  <div key={device.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f8fafc' }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '15px' }}>{device.name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{device.type}</div>
                    </div>
                    <div style={{ color: '#10b981', fontSize: '12px', fontWeight: '600' }}>● Online</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Configuration;
