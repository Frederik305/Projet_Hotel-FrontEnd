
import { useNavigate } from 'react-router-dom'; // Si vous utilisez react-router-dom

const LogoutButton = () => {
    const navigate = useNavigate(); // Pour la navigation après déconnexion

    const handleLogout = () => {
        // Supprimer le token d'authentification du localStorage
        localStorage.removeItem('accessToken');

        navigate('/login'); // Rediriger vers la page de connexion
    };

    return (
        <button onClick={handleLogout}>Se d&eacute;connecter</button>
    );
};

export default LogoutButton;