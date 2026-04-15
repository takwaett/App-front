import React from 'react';
import Graphes from '../../../components/Graphes/Graphes'; 

function Body() {  
    return (
        <main className="content">
            <section className="stats-grid">
                <div className="card"><span>🌡️ Température</span><strong>24.5°C</strong><small>↑ Stable</small></div>
                <div className="card"><span>💧 Humidité</span><strong>58%</strong><small>↓ Normal</small></div>
                <div className="card"><span>🌿 Qualité Air</span><strong>42 ppm</strong><small>✓ Bonne</small></div>
                <div className="card"><span>🧭 Pression</span><strong>669 Pa</strong><small>↑ Stable</small></div>
            </section>

            <section className="charts-section" style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                <h3>Analyses Temps Réel</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Suivi dynamique des capteurs</p>
                
                <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
                    <Graphes />
                </div>
            </section>

            {/* 3. Le bas : Historique + Alertes côte à côte */}
            <div className="bottom-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <section className="table-section" style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
                    <h3>Historique</h3>
                    <table className="data-table" style={{ width: '100%', marginTop: '10px' }}>
                        <thead>
                            <tr><th>📅 Horodatage</th><th>⏱️ Pression</th><th>🌿 Qualité de l'air</th><th>🌡️ Temp</th><th>💧 Hum</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>12:00</td><td>669Pa</td><td>44ppm</td><td>30%</td><td>55%</td></tr>
                        </tbody>
                    </table>
                </section>

                <section className="alerts-section" style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
                    <h3>Alertes Récentes</h3>
                    <div className="alert-item high" style={{ borderLeft: '4px solid red', padding: '10px', background: '#fff5f5', marginTop: '10px' }}>
                        <strong>🚨 Température Critique</strong><br/>
                        <small>Noeud #3 - 32°C atteint</small>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Body;

