import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Layout/Sidebar/Sidebar'; // Import ajouté
import Navbar from '../../components/Layout/Navbar/Navbar';   // Import ajouté
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Graphiques() {
  const [data, setData] = useState([
    { time: 'init', temp: 20 },
    { time: 'init2', temp: 22 }
  ]);

  // État pour gérer la Sidebar
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Simulation de données réelles
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const newValue = Math.floor(Math.random() * 10) + 20;

      setData(prev => [...prev, { time: timeStr, temp: newValue }].slice(-10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: '#f8f9fa', overflow: 'hidden' }}>
      
      {/* 1. SIDEBAR DYNAMIQUE */}
      <div style={{ 
        width: isSidebarVisible ? '260px' : '0px', 
        transition: 'width 0.3s ease-in-out', 
        overflow: 'hidden',
        backgroundColor: '#1a1a2e',
        flexShrink: 0 
      }}>
        <Sidebar />
      </div>

      {/* 2. ZONE DE CONTENU (Navbar + Graphique) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* NAVBAR : Remplace l'ancien header pour piloter la Sidebar */}
        <Navbar toggleSidebar={toggleSidebar} userName="Admin" />

        <main style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1e2235' }}>📈 Analyse des Données</h2>
            <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>Visualisation en temps réel des capteurs EnviroSense</p>
          </section>

          <div style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '15px', 
            height: '450px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0' 
          }}>
            {/* Le ResponsiveContainer s'adaptera automatiquement à la largeur restante */}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#3498db" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTemp)" 
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Graphiques;


