import { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'; 
import { register } from '../../api/auth'; 

function Inscription() {
    // 1. DÉCLARATION DE TOUTES LES VARIABLES UTILISÉES DANS LE FORMULAIRE
    const [Nom, setNom] = useState('');
    const [Prenom, setPrenom] = useState(''); // Pas d'accent ici pour éviter les bugs
    const [Email, setEmail] = useState('');
    const [NumeroDeTelephone, setNumeroDeTelephone] = useState(''); // Ajouté
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState(''); // Ajouté
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Vérification simple de la confirmation du mot de passe
        if (Password !== ConfirmPassword) {
            return setError("Les mots de passe ne correspondent pas.");
        }

        const userData = {
            nom: Nom,
            prenom: Prenom,
            email: Email,
            motDePasse: Password 
        };

        try {
            await register(userData);
            alert("Compte créé avec succès ! Connectez-vous.");
            navigate('/Signin'); 
        } catch (err) {
            setError(err.response?.data?.detail || "Erreur lors de l'inscription.");
        }
    };

    return (
        <div className="inscription-container">
            <form className="inscription-form" onSubmit={handleRegister}>
                <div className="inscription-section">
                    <img src={logo} alt="Logo Plateforme" />
                    <h2>EnviroSense</h2>
                    <p className="slogan">SMART ENVIRONMENTAL MONITORING</p>
                </div>
               
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

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
                        value={Prenom} // Changé : Prenom sans accent
                        onChange={(e) => setPrenom(e.target.value)} // Changé
                        required
                    />
                </div>
                <div className="labels">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Entrez votre email"
                        value={Email} // Changé : Email avec E majuscule pour correspondre au state
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="labels">
                    <label>Numéro de téléphone</label>
                    <input
                        type="text"
                        placeholder="Entrez votre numéro de téléphone"
                        value={NumeroDeTelephone} // Changé
                        onChange={(e) => setNumeroDeTelephone(e.target.value)} // Changé
                        required
                    />
                </div>
                <div className="labels">
                    <label>mot de passe</label>
                    <input
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        value={Password} // Changé : Password avec P majuscule
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="labels">
                    <label>Confirmer le mot de passe</label>
                    <input
                        type="password"
                        placeholder="Confirmez votre mot de passe"
                        value={ConfirmPassword} // Changé
                        onChange={(e) => setConfirmPassword(e.target.value)} // Changé
                        required
                    />
                </div>
                <div className="checkbox">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">J'accepte les conditions d'utilisation</label>
                </div>   
                
                <button type="submit" className="inscription-btn">s'inscrire</button>
                 
                <p className="se-connecter"> Déjà inscrit ? <Link to="/Signin" className="Links">Retour à la page de connexion</Link></p>
            </form>
        </div>
    );
}

export default Inscription;
