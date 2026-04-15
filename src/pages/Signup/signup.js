import {useState} from 'react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import { register, login } from '../../services/authService'; 

function Inscription() {
    const [Nom, setNom] = useState('');
    const [Prénom, setPrénom] = useState('');
    const [email, setEmail] = useState('');
     const [Numérodetéléphone, setNumérodetéléphone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    const userData = {
        nom: Nom,
        prenom: Prénom, 
        email: email,
        motDePasse: password,
        role: "user"
    };
    
    await register(userData);  
    alert("Compte créé avec succès ! Connecte-toi maintenant.");
    navigate('/login'); 

} catch (error) {
    alert("Erreur lors de l'inscription : " + error.response?.data?.detail);
}
  }


    return (
          <div className="inscription-container">
            <form className="inscription-form" onSubmit={handleSubmit}>
                <div className="inscription-section">
                    <img src={logo} alt="Logo Plateforme" />
                    <h2 >EnviroSense</h2>
                    <p className="slogan">SMART ENVIRONMENTAL MONITORING</p>
                </div>
               
                  <div className="labels">
                    <label>Nom</label>
                    <input
                        type="text"
                        placeholder="Entrez votre nom"
                        value={Nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                 <div className="labels">
                    <label>Prénom</label>
                    <input
                        type="text"
                        placeholder="Entrez votre prénom"
                        value={Prénom}
                        onChange={(e) => setPrénom(e.target.value)}
                        required
                    />
                </div>
                 <div className="labels">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Entrez votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                 <div className="labels">
                    <label>Numéro de téléphone</label>
                    <input
                        type="text"
                        placeholder="Entrez votre numéro de téléphone"
                        value={Numérodetéléphone}
                        onChange={(e) => setNumérodetéléphone(e.target.value)}
                        required
                    />
                </div>
                 <div className="labels">
                    <label>mot de passe</label>
                    <input
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="labels">
                    <label>Confirmer le mot de passe</label>
                    <input
                        type="password"
                        placeholder="Confirmez votre mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                     <div className="checkbox">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">J'accepte les conditions d'utilisation</label>
                </div>   
                  
                
                 <button type="submit" className="inscription-btn">s'inscrire</button>
                 
                 <p className="se-connecter"> Déjà inscrit ? <Link to="/login" className="Links">Retour à la page de connexion</Link></p>
                 
                 </form>
                 </div>
                    
            
    );
}

export default Inscription;