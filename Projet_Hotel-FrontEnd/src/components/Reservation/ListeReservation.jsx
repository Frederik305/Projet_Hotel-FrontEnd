/* eslint-disable react/prop-types */
import Reservation from './Reservation';




const ListeReservation = ({reservations ,error }) => {

    return (
        <div className="container-reservation-list">
            <h2>Données de la recherche:</h2>
            {error ? (
                <p>Erreur : {error}</p>
            ) : (
                reservations.length === 0 ? (
                    <p>Aucune réservation trouvée avec les critères de recherche.</p>
                ) : (
                    <div className="reservation-list">
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