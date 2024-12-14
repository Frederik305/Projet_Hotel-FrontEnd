import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ListeReservation from './ListeReservation';


const AfficheReservation = () => {
    const [reservations, setReservations] = useState([]); // État pour stocker les réservations récupérées
    const [error, setError] = useState(''); // État pour gérer le message d'erreur
    const navigate = useNavigate(); // Hook pour la navigation

    useEffect(() => {
        // Fonction pour récupérer les réservations depuis l'API
        const fetchReservations = async () => {
            const token = localStorage.getItem('accessToken');

            // Si le token est absent, rediriger vers la page de connexion
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // Requête GET pour récupérer les réservations
                const response = await fetch('http://localhost:5292/Reservation/afficherReservation', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Ajout du token dans les en-têtes pour l'authentification
                    },
                });

                // Vérification de la réponse du serveur
                if (response.status === 401) {
                    // Si l'utilisateur n'est pas autorisé ou si le token est invalide
                    alert('Votre session a expiré ou vous n’êtes pas autorisé. Veuillez vous reconnecter.');
                    navigate('/login'); // Redirection vers la page de connexion
                    return;
                } else if (response.status === 404) {
                    throw new Error('Aucune réservation.');
                }

                // Si la requête échoue pour une autre raison
                if (!response.ok) {
                    throw new Error('Erreur de récupération des réservations');
                }

                // Si tout se passe bien, parsez la réponse et mettez à jour l'état avec les données
                const data = await response.json();
                setReservations(data);
            } catch (err) {
                setError(err.message);
            }
        };

        // Appel de la fonction pour récupérer les réservations dès que le composant est monté
        fetchReservations();
    }, [navigate]); // Ajout du `navigate` dans les dépendances pour rediriger au besoin

    return (
        <main>
            <div className="containerSearch">
                <div className="container-reservation-list">
                    {/* Affichage de la liste des réservations ou d'un message d'erreur */}
                    <ListeReservation reservations={reservations} error={error} />
                </div>
            </div>
        </main>
    );
};

export default AfficheReservation;