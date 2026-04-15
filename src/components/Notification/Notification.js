import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css";

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const notifRef = useRef();

  const notifications = [
    { id: 1, text: "🌡 Température élevée !", time: "Il y a 2 min" },
    { id: 2, text: "💧 Humidité normale", time: "Il y a 10 min" },
    { id: 3, text: "🌿 Qualité d'air bonne", time: "Il y a 1 heure" },
  ];

  // 🔒 Fermer si clic dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🚀 Fonction clic notification
  const handleClickNotif = (notif) => {
    setOpen(false);

    // 👉 simple redirection
    navigate("/alertes");

    // 👉 OPTION AVANCÉE (si tu veux passer data)
    // navigate("/alertes", { state: { notif } });
  };

  return (
    <div className="notif-container" ref={notifRef}>
      
      {/* 🔔 ICON */}
      <div className="bell" onClick={() => setOpen(!open)}>
        🔔
        <span className="badge">{notifications.length}</span>
      </div>

      {/* 📩 DROPDOWN */}
      {open && (
        <div className="notif-dropdown">
          <h4>Notifications</h4>

          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="notif-item clickable"
              onClick={() => handleClickNotif(notif)}
            >
              <div>{notif.text}</div>
              <small>{notif.time}</small>
            </div>
          ))}

          <button
            className="see-all"
            onClick={() => {
              setOpen(false);
              navigate("/alertes");
            }}
          >
            Voir tout
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;







       


  



