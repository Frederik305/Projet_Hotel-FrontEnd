import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import ListeModifierReservation from './ListeModifierReservation';
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const RechercheReservation = () => {
    const [reservations, setReservations] = useState([]); // État pour stocker les réservations obtenues
    const [error, setError] = useState(''); // État pour stocker le message d'erreur
    const navigate = useNavigate(); // Hook pour gérer la navigation

    const [startDate, setStartDate] = useState(null); // État pour la date de début
    const [endDate, setEndDate] = useState(null); // État pour la date de fin

    const [price, setPrice] = useState(0.0); // État pour le prix


    // Vérification de la présence du token d'authentification
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login'); // Si aucun token n'est présent, redirige l'utilisateur vers la page de login
        }
    }, [navigate]);

    // Fonction pour effectuer la recherche des réservations
    const searchReservations = async () => {
        setReservations([]);
        setError('');

        // Formatage des dates pour l'URL de la requête
        const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd'T'HH:mm:ss") : "";
        const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd'T'HH:mm:ss") : "";
        const formattedPrice = price || 0.0;

        // Construction des paramètres de recherche
        const criteres = new URLSearchParams({
            ResDateDebut: formattedStartDate,
            ResDateFin: formattedEndDate,
            ResPrixJour: formattedPrice.toString(),
        });

        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login'); // Si le token est absent, redirige vers la page de login
            return;
        }

        try {
            // Envoi de la requête GET pour rechercher les réservations
            const response = await fetch(`http://localhost:5292/Reservation/rechercherReservation?${criteres.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Utilisation du token pour l'authentification
                },
            });

            // Vérification du code de statut de la réponse
            if (response.status === 401) {
                alert('Votre session a expiré ou vous n’êtes pas autorisé. Veuillez vous reconnecter.');
                navigate('/login'); // Redirige vers la page de connexion si l'authentification échoue
                return;
            } else if (response.status === 404) {
                setReservations([]);
                setError('Aucune réservation ne correspond à votre recherche.');
                return;
            }

            if (!response.ok) {
                throw new Error('Erreur de récupération des réservations');
            }

            // Récupération des données JSON et mise à jour de l'état
            const data = await response.json();
            setReservations(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="containerSearch">
                <div className="form-search">
                    <h2>Rechercher une réservation à modifier</h2>
                    {/* DatePicker pour la sélection de la date de début */}
                    <label>Date de début:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        isClearable
                        placeholderText="Choisissez la date de début de la réservation"
                    />
                    {/* DatePicker pour la sélection de la date de fin */}
                    <label>Date de fin:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        isClearable
                        placeholderText="Choisissez la date de fin de la réservation"
                    />
                    {/* Champ pour saisir le prix */}
                    <label>Prix:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Prix"
                    />
                    {/* Bouton pour lancer la recherche */}
                    <button onClick={searchReservations}>Rechercher</button>
                </div>

                {/* Affichage de la liste des réservations ou d'un message d'erreur */}
                <ListeModifierReservation reservations={reservations} error={error} />
            </div>
        </>
    );
};

export default RechercheReservation; // Exportation du composant
