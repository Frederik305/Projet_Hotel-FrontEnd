/* eslint-disable react/prop-types */
import Reservation from './Reservation'; // Importation du composant Reservation

// Composant ListeReservation qui affiche une liste de réservations
const ListeReservation = ({ reservations, error }) => {

    return (
        <div className="container-reservation-list">
            <h2>Données de la recherche:</h2>

            {/* Vérifie s'il y a une erreur, et si oui, l'affiche */}
            {error ? (
                <p>Erreur : {error}</p>  // Affiche le message d'erreur
            ) : (
                // Si aucune erreur, vérifie s'il y a des réservations à afficher
                reservations.length === 0 ? (
                    <p>Aucune résultat.</p>  // Message si aucune réservation n'est trouvée
                ) : (
                    <div className="reservation-list">
                        {/* Parcourt le tableau des réservations et rend un composant Reservation pour chaque élément */}
                        {reservations.map((reservation) => (
                            <Reservation key={reservation.pkResId} reservation={reservation} />
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default ListeReservation;
