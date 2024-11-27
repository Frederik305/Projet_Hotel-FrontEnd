/* eslint-disable react/prop-types */
//import Reservation from "./Reservation";
import EditReservation from "./EditReservation"




const ListeReservation = ({reservations ,error }) => {

    return (
        <div className ="container-reservation-list">
            <h2>Ma Liste de Donn�es</h2>
            {error ? (
                <p>Erreur : {error}</p>
            ) : (
                    <div className="reservation-list">
                        {reservations.map((reservation) => (
                            <EditReservation key={reservation.pkResId} reservation={reservation} />
                        ))}
                    </div>
            )}
        </div>
    );
};
export default ListeReservation;