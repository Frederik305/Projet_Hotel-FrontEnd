import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ListeReservation from './ListeReservation';




const AfficheReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    
    useEffect(() => {
        const fetchReservations = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login'); // Si pas de token, rediriger vers la page de connexion
                return;
            }
            try {
                const response = await fetch('http://localhost:5292/Reservation/afficherReservation', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Ajout du token dans l'en-tête
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur de récupération des réservations');
                }

                const data = await response.json();
                setReservations(data);
            } catch (err) {
                setError(err.message);
                navigate('/login'); // En cas d'erreur, rediriger vers la page de connexion
            }
        };

        fetchReservations();
    }, [navigate]);

    return (
        <>
            <button>Afficher</button>
            {/*reservations.lenght > 0 &&*/ <ListeReservation reservations={reservations} error={error} /> }
        </>
            );
};
            export default AfficheReservation