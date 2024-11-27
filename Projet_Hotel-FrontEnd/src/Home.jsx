/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifiez la présence de l'accessToken dans le localStorage
        const token = localStorage.getItem('accessToken');

        if (token) {
            // Si le token est présent, on considère que l'utilisateur est authentifié
            setIsAuthenticated(true);
        } else {
            // Si le token est absent, rediriger l'utilisateur vers la page de login
            navigate('/login');
        }
    }, [navigate]);
    
    return (

        <>
            {isAuthenticated ? (
                <h1>{"Bienvenue sur la page d'accueil"}</h1>
            ) : (
                    <h1>{"Vous n'êtes pas authentifié"}</h1>
            )}
            
        </>
    );
};
export default Home;
