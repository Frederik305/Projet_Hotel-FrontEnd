// useReservation.js (Custom Hook)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useReservation = (Reservation, Chambre) => {
    // Définition des états locaux pour gérer les données de la réservation et les erreurs
    const [error, setError] = useState('');                     // Variable d'erreur
    const [chambre, setChambre] = useState('');                 // Stocke les données de la chambre
    const [client, setClient] = useState('');                   // Stocke les données du client
    const [typeChambre, setTypeChambre] = useState('');         // Stocke les données du type de chambre
    const navigate = useNavigate();                             // Hook de navigation pour rediriger en cas d'erreur ou condition particulière


    // Fonction pour récupérer les données d'une chambre par son identifiant
    const fetchChambre = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login'); // Si pas de token, rediriger vers la page de connexion
            return;
        }
        try {
            // Construction de l'URL pour récupérer les informations de la chambre
            const url = `http://localhost:5292/GetChambreById?PkChaId=${Reservation.fkChaId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ajouter le token d'authentification dans les en-têtes
                },
            });

            if (!response.ok) {
                throw new Error('Erreur de récupération des réservations');
            }

            const data = await response.json(); // Transformation des données de la réponse en JSON
            setChambre(data);
        } catch (err) {
            setError(err.message);
            navigate('/login');
        }
    };

    // Fonction pour récupérer les données du client par son identifiant
    const fetchClient = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login'); // Si pas de token, rediriger vers la page de connexion
            return;
        }
        try {
            // Construction de l'URL pour récupérer les informations du client
            const url = `http://localhost:5292/Client/GetClientById?PkCliId=${Reservation.fkCliId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ajouter le token dans les en-têtes de la requête
                },
            });

            if (!response.ok) {
                throw new Error('Erreur de récupération des réservations'); // Si la réponse échoue
            }

            const data = await response.json(); // Récupérer les données du client
            setClient(data);
        } catch (err) {
            setError(err.message);
            navigate('/login');
        }
    };

    // Fonction pour récupérer le type de chambre par son identifiant
    const fetchTypeChambre = async () => {
        const token = localStorage.getItem('accessToken'); // Récupération du token d'authentification
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            // Construction de l'URL pour récupérer les informations du type de chambre
            const url = `http://localhost:5292/GetTypeChambreById?PkTypId=${Chambre.fkTypId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ajouter le token dans les en-têtes
                },
            });

            if (!response.ok) {
                throw new Error('Erreur de récupération du type de chambre'); // Gérer l'échec de la réponse
            }

            const data = await response.json(); // Transformer la réponse en JSON
            setTypeChambre(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Retourner les valeurs et fonctions afin qu'elles soient accessibles à l'extérieur du hook
    return {
        error,
        chambre,
        client,
        typeChambre,
        fetchChambre,
        fetchClient,
        fetchTypeChambre,
    };
};

export default useReservation;
