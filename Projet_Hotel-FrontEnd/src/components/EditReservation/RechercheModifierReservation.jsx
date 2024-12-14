import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import ListeModifierReservation from './ListeModifierReservation';
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const RechercheReservation = () => {
    const [reservations, setReservations] = useState([]); // �tat pour stocker les r�servations obtenues
    const [error, setError] = useState(''); // �tat pour stocker le message d'erreur
    const navigate = useNavigate(); // Hook pour g�rer la navigation

    const [startDate, setStartDate] = useState(null); // �tat pour la date de d�but
    const [endDate, setEndDate] = useState(null); // �tat pour la date de fin

    const [price, setPrice] = useState(0.0); // �tat pour le prix


    // V�rification de la pr�sence du token d'authentification
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login'); // Si aucun token n'est pr�sent, redirige l'utilisateur vers la page de login
        }
    }, [navigate]);

    // Fonction pour effectuer la recherche des r�servations
    const searchReservations = async () => {
        setReservations([]);
        setError('');

        // Formatage des dates pour l'URL de la requ�te
        const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd'T'HH:mm:ss") : "";
        const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd'T'HH:mm:ss") : "";
        const formattedPrice = price || 0.0;

        // Construction des param�tres de recherche
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
            // Envoi de la requ�te GET pour rechercher les r�servations
            const response = await fetch(`http://localhost:5292/Reservation/rechercherReservation?${criteres.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Utilisation du token pour l'authentification
                },
            });

            // V�rification du code de statut de la r�ponse
            if (response.status === 401) {
                alert('Votre session a expir� ou vous n��tes pas autoris�. Veuillez vous reconnecter.');
                navigate('/login'); // Redirige vers la page de connexion si l'authentification �choue
                return;
            } else if (response.status === 404) {
                setReservations([]);
                setError('Aucune r�servation ne correspond � votre recherche.');
                return;
            }

            if (!response.ok) {
                throw new Error('Erreur de r�cup�ration des r�servations');
            }

            // R�cup�ration des donn�es JSON et mise � jour de l'�tat
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
                    <h2>Rechercher une r�servation � modifier</h2>
                    {/* DatePicker pour la s�lection de la date de d�but */}
                    <label>Date de d�but:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        isClearable
                        placeholderText="Choisissez la date de d�but de la r�servation"
                    />
                    {/* DatePicker pour la s�lection de la date de fin */}
                    <label>Date de fin:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        isClearable
                        placeholderText="Choisissez la date de fin de la r�servation"
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

                {/* Affichage de la liste des r�servations ou d'un message d'erreur */}
                <ListeModifierReservation reservations={reservations} error={error} />
            </div>
        </>
    );
};

export default RechercheReservation; // Exportation du composant
