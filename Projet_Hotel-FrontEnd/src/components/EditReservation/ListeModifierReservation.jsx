/* eslint-disable react/prop-types */
import EditReservation from "./EditReservation"; // Importation du composant pour modifier chaque réservation

const ListeReservation = ({ reservations, error }) => {
    return (
        <div className="container-reservation-list">
            <h2>Données de la recherche:</h2>

            {error ? ( // Si une erreur existe, on affiche le message d'erreur
                <p>Erreur : {error}</p>
            ) : (
                reservations.length === 0 ? ( // Si aucune réservation n'est trouvée
                    <p>Aucune réservation trouvée avec les critères de recherche.</p>
                ) : (
                    <div className="reservation-list">
                        {reservations.map((reservation) => ( // Pour chaque réservation, on affiche un composant EditReservation
                            <EditReservation key={reservation.pkResId} reservation={reservation} />
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default ListeReservation; // Exportation du composant ListeReservation
