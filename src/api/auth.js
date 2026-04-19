import axios from 'axios';

const API_URL = "http://localhost:8000/auth";

export const login = async (email, password) => {
    try {
        const params = new URLSearchParams();
        params.append('username', email); 
        params.append('password', password);

        const response = await axios.post(`${API_URL}/login`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        if (response.data && response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        
        return response.data; 
    } catch (error) {
        console.error("Erreur lors de la connexion:", error.response?.data || error.message);
        throw error;
    }
};
export const register = async (userData) => {
    try {

        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error.response?.data || error.message);
        throw error;
    }
};
export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data; 
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token'); 
        }
        throw error;
    }
};

