import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker"; // Pour la sélection de dates
import ListeReservation from './ListeReservation'; // Pour afficher la liste des réservations
import "react-datepicker/dist/react-datepicker.css"; // CSS pour le calendrier de DatePicker
import { format } from "date-fns"; // Formatage des dates

const RechercheReservation = () => {
    // États pour stocker les données des réservations et autres états locaux
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');                     // Message d'erreur à afficher
    const [startDate, setStartDate] = useState(null);           // Date de début pour la recherche
    const [endDate, setEndDate] = useState(null);               // Date de fin pour la recherche
    const [price, setPrice] = useState(0.0);                    // Prix pour filtrer les réservations
    const navigate = useNavigate();                             // Hook de navigation pour rediriger l'utilisateur

    // Effet pour vérifier la présence du token d'authentification à chaque montage du composant
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            // Si pas de token, on redirige l'utilisateur vers la page de connexion
            navigate('/login');
        }
    }, [navigate]);

    // Fonction de recherche des réservations avec les critères
    const searchReservations = async () => {
        // Réinitialisation des états avant chaque nouvelle recherche
        setReservations([]);
        setError('');
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
            navigate('/login'); // Si pas de token, redirection vers la page de connexion
            return;
        }

        try {
            // Requête GET pour rechercher les réservations
            const response = await fetch(`http://localhost:5292/Reservation/rechercherReservation?${criteres.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ajout du token dans les en-têtes pour l'authentification
                },
            });

            // Gestion des erreurs HTTP spécifiques
            if (response.status === 401) {
                alert('Votre session a expiré ou vous n’êtes pas autorisé. Veuillez vous reconnecter.');
                navigate('/login');
                return;
            }
            else if (response.status === 404) {
                setReservations([]);
                setError('Aucune réservation ne correspond à votre recherche.');
                return;
            }

            if (!response.ok) {
                throw new Error('Erreur de récupération des réservations');
            }

            // Si la réponse est correcte, on parse les données JSON et on met à jour l'état des réservations
            const data = await response.json();
            setReservations(data);
        } catch (err) {
            setError(err.message); // En cas d'erreur, on met à jour l'état error
        }
    };

    return (
        <>
            <div className="containerSearch">
                <div className="form-search">
                    <h2>Rechercher une réservation</h2>
                    {/* Sélecteur de date de début */}
                    <label>Date de début:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        isClearable
                        placeholderText="Choisissez la date de début de la réservation"
                    />
                    {/* Sélecteur de date de fin */}
                    <label>Date de fin:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        isClearable
                        placeholderText="Choisissez la date de fin de la réservation"
                    />
                    {/* Champ pour le prix */}
                    <label>Prix:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Prix"
                    />
                    {/* Bouton de recherche */}
                    <button onClick={searchReservations}>Rechercher</button>
                </div>

                {/* Liste des réservations ou message d'erreur */}
                <ListeReservation reservations={reservations} error={error} />
            </div>
        </>
    );
};

export default RechercheReservation;
