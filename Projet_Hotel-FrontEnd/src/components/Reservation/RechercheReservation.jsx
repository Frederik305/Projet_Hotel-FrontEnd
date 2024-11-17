import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import ListeReservation from './ListeReservation';
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";




const RechercheReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [price, setPrice] = useState(0.0);    
    
    
       

    const searchReservations = async () => {
        
        const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd'T'HH:mm:ss") : "";
        const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd'T'HH:mm:ss") : "";
        const formattedPrice = price || 0.0 ;

        const criteres = new URLSearchParams({
            ResDateDebut:  formattedStartDate ,
            ResDateFin:  formattedEndDate ,
            ResPrixJour: formattedPrice.toString(),
        });


        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login'); // Si pas de token, rediriger vers la page de connexion
            return;
        }
        try {
            const response = await fetch(`http://localhost:5292/Reservation/rechercherReservation?${criteres.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ajout du token dans l'en-tête
                },
            });
            if (response.status === 401) {
                // Si l'utilisateur n'est pas autorisé
                alert('Votre session a expiré ou vous n’êtes pas autorisé. Veuillez vous reconnecter.');
                navigate('/login'); // Redirection vers la page de connexion
                return;
            }
            else if (response.status === 404) {
                throw new Error('Aucune réservation ne correspond à votre recherche.');
            }

            if (!response.ok) {
                throw new Error('Erreur de récupération des réservations');
            }
            

            const data = await response.json();
            setReservations(data);
        } catch (err) {
            setError(err.message);
            
        }
    };



    return (
        <>
            <div className="containerSearch">
                <label>Date de début:</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                
                    dateFormat="yyyy-MM-dd" // Format de la date
                    isClearable // Ajoute une icône pour effacer la sélection
                    placeholderText="Choisissez la date de début de la réservation"
                />
                <label>Date de fin:</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}

                    dateFormat="yyyy-MM-dd" // Format de la date
                    isClearable // Ajoute une icône pour effacer la sélection
                    placeholderText="Choisissez la date de fin de la réservation"
                />
                <label>Prix:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Prix"
                />
                <button onClick={searchReservations}>Rechercher</button>
                {reservations.length > 0 && <ListeReservation reservations={reservations} error={error} />}
            </div>
        </>
    );
};

export default RechercheReservation;
