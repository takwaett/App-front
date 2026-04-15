import axios from 'axios';

// ⚠️ ERREUR CORRIGÉE : L'URL doit être complète et pointer sur ton backend
const API_URL = "http://127.0.0.1:8000/auth";

// 1. CONNEXION (Login)
export const login = async (email, password) => {
    try {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        const response = await axios.post(`${API_URL}/login`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // FastAPI OAuth2 renvoie 'access_token'
        if (response.data && response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        return response.data;
    } catch (error) {
        console.error("Erreur login service:", error.response?.data || error.message);
        throw error;
    }
};

// 2. INSCRIPTION (Register)
export const register = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

// 3. DÉCONNEXION (Logout)
export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

// 4. RÉCUPÉRATION DU PROFIL
export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        // ⚠️ ERREUR CORRIGÉE : Ton commentaire disait "http://127.0.0"
        // Assure-toi que cette route existe bien dans FastAPI (@app.get("/auth/me"))
        const response = await axios.get(`${API_URL}/me`, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data; 
    } catch (error) {
        // Si le token est expiré ou invalide (401), on nettoie
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
        }
        throw error;
    }
};

// --- AUTRES SERVICES ---
export const requestPasswordReset = async (email) => {
    // ⚠️ ATTENTION : Vérifie l'URL ici, elle était incomplète
    return await axios.post("http://127.0.0/request-reset", { email });
};

export const resetPassword = async (email, code, newPassword) => {
    return await axios.post("http://127.0.0.1:8000/reset-password", { 
        email, 
        code, 
        new_password: newPassword 
    });
};
