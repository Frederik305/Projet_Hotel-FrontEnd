import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ListeReservation from './ListeReservation';


const AfficheReservation = () => {
    const [reservations, setReservations] = useState([]); // �tat pour stocker les r�servations r�cup�r�es
    const [error, setError] = useState(''); // �tat pour g�rer le message d'erreur
    const navigate = useNavigate(); // Hook pour la navigation

    useEffect(() => {
        // Fonction pour r�cup�rer les r�servations depuis l'API
        const fetchReservations = async () => {
            const token = localStorage.getItem('accessToken');

            // Si le token est absent, rediriger vers la page de connexion
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // Requ�te GET pour r�cup�rer les r�servations
                const response = await fetch('http://localhost:5292/Reservation/afficherReservation', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Ajout du token dans les en-t�tes pour l'authentification
                    },
                });

                // V�rification de la r�ponse du serveur
                if (response.status === 401) {
                    // Si l'utilisateur n'est pas autoris� ou si le token est invalide
                    alert('Votre session a expir� ou vous n��tes pas autoris�. Veuillez vous reconnecter.');
                    navigate('/login'); // Redirection vers la page de connexion
                    return;
                } else if (response.status === 404) {
                    throw new Error('Aucune r�servation.');
                }

                // Si la requ�te �choue pour une autre raison
                if (!response.ok) {
                    throw new Error('Erreur de r�cup�ration des r�servations');
                }

                // Si tout se passe bien, parsez la r�ponse et mettez � jour l'�tat avec les donn�es
                const data = await response.json();
                setReservations(data);
            } catch (err) {
                setError(err.message);
            }
        };

        // Appel de la fonction pour r�cup�rer les r�servations d�s que le composant est mont�
        fetchReservations();
    }, [navigate]); // Ajout du `navigate` dans les d�pendances pour rediriger au besoin

    return (
        <main>
            <div className="containerSearch">
                <div className="container-reservation-list">
                    {/* Affichage de la liste des r�servations ou d'un message d'erreur */}
                    <ListeReservation reservations={reservations} error={error} />
                </div>
            </div>
        </main>
    );
};

export default AfficheReservation;