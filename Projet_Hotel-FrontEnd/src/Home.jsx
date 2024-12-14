/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Home = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        // V�rifiez la pr�sence de l'accessToken dans le localStorage
        const token = localStorage.getItem('accessToken');

        if (!token) {
            // Si le token est pr�sent, on consid�re que l'utilisateur est authentifi�
            navigate('/login');
        } 
    }, [navigate]);
    
    return (
        <main>
            <h1>{"Bienvenue sur la page d'accueil"}</h1>
        </main>
    );
};
export default Home;
