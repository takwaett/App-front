import { useState } from 'react';
import {Link,useNavigate } from 'react-router-dom';
import mdp from '../../assets/mdp.png';
import './ForgetPassword.css';
import { requestPasswordReset, resetPassword } from '../../services/authService';



function ForgetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [nouveaumotdePasse, setnouveaumotdepasse] = useState('');

   
    

  const handleSendCode = async () => {
    if (!email) return alert("Veuillez saisir un email.");
    try {
        await requestPasswordReset(email); // Appel au backend
        alert("Si cet email existe, un code vient d'être envoyé !");
    } catch (error) {
        alert("Erreur lors de l'envoi du code.");
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await resetPassword(email, code, nouveaumotdePasse); // Appel au backend
        alert("Mot de passe réinitialisé avec succès !");
        navigate('/login');
    } catch (error) {
        alert("Code invalide ou expiré.");
    }
};
    

    return (
        <div className="page-background">
            <div className="ForgetPassword-container">
                <div className="ForgetPassword-header">
                    <h1>Mot de passe oublié</h1>
                    <img src={mdp} alt="Logo" className="header-icon" />
                    <p className="slogan">Réinitialisez votre mot de passe</p>
                </div>

                <form className="ForgetPassword-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <div className="input-with-button">
                            <input
                                type="email"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="button" className="btn-send" onClick={handleSendCode}>Envoyer code </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Code de vérification</label>
                        <input
                            type="text"
                            placeholder="Entrez le code reçu"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Nouveau mot de passe</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={nouveaumotdePasse}
                            onChange={(e) => setnouveaumotdepasse(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary">Confirmer le nouveau mot de passe</button>
                    
                    <Link to="/login" className="retour">Retour à la page de connexion</Link>
                   
                </form>
               </div>
               
            </div>
        
    );
}

export default ForgetPassword;
