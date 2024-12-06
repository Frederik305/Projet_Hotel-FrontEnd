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
                        'Authorization': `Bearer ${token}`, // Ajout du token dans l'en-t�te
                    },
                });
                if (response.status === 401) {
                    // Si l'utilisateur n'est pas autoris�
                    alert('Votre session a expir� ou vous n��tes pas autoris�. Veuillez vous reconnecter.');
                    navigate('/login'); // Redirection vers la page de connexion
                    return;
                }
                else if (response.status === 404) {
                    throw new Error('Aucune r�servation.');
                }
                if (!response.ok) {
                    throw new Error('Erreur de r�cup�ration des r�servations');
                }

                const data = await response.json();
                setReservations(data);
            } catch (err) {
                setError(err.message);
                
            }
        };

        fetchReservations();
    }, [navigate]);

    return (
        <div className="containerSearch">
        <div className="container-reservation-list">  
        
            {reservations.length > 0 && <ListeReservation reservations={reservations} error={error} /> }
        </div></div>
            );
};
            export default AfficheReservation