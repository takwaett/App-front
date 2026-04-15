import React, { useState } from 'react';
import Sidebar from '../../components/Layout/Sidebar/Sidebar';
import Navbar from '../../components/Layout/Navbar/Navbar';

function User() {
  const [user, setUser] = useState({
    nom: "EnviroSense",
    prenom: "Admin", 
    email: "admin@envirosense.com",
    role: "Administrateur Système",
    telephone: "+216 12 340 564"
  });

  // État pour gérer l'affichage de la sidebar
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); 

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("✅ Profil mis à jour !");
  };

  const isAdmin = user.role.toLowerCase().includes("admin");

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
      
      {/* SIDEBAR : Largeur dynamique selon l'état */}
      <div style={{ 
        width: isSidebarVisible ? '260px' : '0px', 
        transition: 'all 0.3s ease-in-out', 
        overflow: 'hidden',
        backgroundColor: '#1a1a2e',
        flexShrink: 0 
      }}>
        <Sidebar />
      </div>

      {/* ZONE DROITE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* NAVBAR : On lui passe la fonction toggleSidebar en prop */}
        <Navbar toggleSidebar={toggleSidebar} userName={user.prenom} />

        {/* CONTENU PRINCIPAL */}
        <main style={{ padding: '30px', overflowY: 'auto', flex: 1 }}>
          <section style={{ marginBottom: '25px' }}>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.5rem' }}>👤 Mon Profil</h3>
            <p style={{ margin: 0, color: '#64748b' }}>Gérez vos informations personnelles et vos paramètres de sécurité</p>
          </section>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '20px' 
          }}>
            
            {/* CARTE GAUCHE : FORMULAIRE */}
            <section style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
              <h4 style={{ marginTop: 0, marginBottom: '20px' }}>Informations Personnelles</h4>
              <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Nom complet</label>
                  <input type="text" value={user.nom} onChange={(e) => setUser({...user, nom: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Prénom</label>
                  <input type="text" value={user.prenom} onChange={(e) => setUser({...user, prenom: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Email</label>
                  <input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <button type="submit" style={{ marginTop: '10px', padding: '12px', background: '#1e2235', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                  💾 Mettre à jour
                </button>
              </form>
            </section>

            {/* CARTE DROITE : STATUT */}
            <section style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
              <h4 style={{ marginTop: 0, marginBottom: '20px' }}>Sécurité & Compte</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Rôle actuel</span>
                  <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{user.role} {isAdmin && "🛡️"}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Statut :</span>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', background: '#dcfce7', color: '#10b981', fontWeight: 'bold' }}>ACTIF</span>
                </div>
                {isAdmin && (
                  <div style={{ marginTop: '15px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', fontSize: '12px' }}>
                    <strong>Note admin :</strong> Vous avez accès aux réglages système.
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default User;






