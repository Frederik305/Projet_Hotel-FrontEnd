/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // V�rifiez la pr�sence de l'accessToken dans le localStorage
        const token = localStorage.getItem('accessToken');

        if (token) {
            // Si le token est pr�sent, on consid�re que l'utilisateur est authentifi�
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
                    <h1>{"Vous n'�tes pas authentifi�"}</h1>
            )}
            
        </>
    );
};
export default Home;
