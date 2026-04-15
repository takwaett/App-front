import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function Graphes() {
  const [sensorData, setSensorData] = useState([{ time: '00:00', temp: 20, hum: 45 }]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      setSensorData(prev => [...prev, {
        time: timeStr,
        temp: (Math.random() * (30 - 20) + 20).toFixed(1),
        hum: (Math.random() * (70 - 40) + 40).toFixed(0)
      }].slice(-10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    /* On ne retourne QUE le graphique, sans header ni main */
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={sensorData}>
        <defs>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3498db" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#3498db" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="time" tick={{fontSize: 10}} />
        <YAxis tick={{fontSize: 10}} />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Area name="Température (°C)" type="monotone" dataKey="temp" stroke="#ef4444" fill="url(#colorTemp)" />
        <Area name="Humidité (%)" type="monotone" dataKey="hum" stroke="#3498db" fill="url(#colorHum)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Graphes;
