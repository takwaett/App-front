import { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
// 1. IMPORTATION DU SERVICE
import { login } from '../../services/authService'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 2. RENDRE LA FONCTION ASYNCHRONE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 3. APPEL AU BACKEND
            const data = await login(email, password);

            // 4. VÉRIFICATION DU TOKEN
            if (data && data.access_token) {
                console.log('Connexion réussie !');
                // ON NE NAVIGUE QUE SI LE SERVEUR A DIT OK
                navigate('/dashboard');
            }
        } catch (error) {
            // 5. GESTION DE L'ERREUR (MOT DE PASSE FAUX)
            console.error('Erreur de connexion:', error);
            alert("Email ou mot de passe incorrect !");
            // Optionnel : effacer le mot de passe pour recommencer
            setPassword('');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
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
}

export default Login;
