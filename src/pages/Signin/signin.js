import { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
// 1. IMPORTATION DU SERVICE
import { login } from '../../api/auth'; 

function Login({ setUserName }) { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            if (data && data.access_token) {
                // 1. On met à jour le nom global AVANT de changer de page
                // Vérifie si ton backend renvoie 'user.nom' ou 'user.username'
                if (data.user) {
                    setUserName(data.user.nom); 
                }
                
                // 2. On change de page
                navigate('/dashboard');
            }
        } catch (error) {
            alert("Email ou mot de passe incorrect !");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSignin}>
                <div className="logo-plateforme">
                    <img src={logo} alt="Logo Plateforme" />
                    <h2>EnviroSense</h2>
                    <p className="slogan">SMART ENVIRONMENTAL MONITORING</p>
                </div>

                <div className="labels">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="labels">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-btn">Connexion</button>

                <div className="links">
                    <Link to="/forgot-password">Mot de passe oublié ?</Link>
                    <p> Pas encore inscrit ? <Link to="/inscription">S'inscrire</Link></p>
                </div>
            </form>
        </div>
    );
} // Accolade de fin de fonction Login remise ici

export default Login;
