/* eslint-disable react/prop-types */

import Reservation from './Reservation';




const ListeReservation = ({reservations ,error }) => {

    return (
        <div>
            <h2>Ma Liste de Donn�es</h2>
            {error ? (
                <p>Erreur : {error}</p>
            ) : (
                    <div className="reservation-list">
                        {reservations.map((reservation) => (
                            <Reservation key={reservation.pkResId} reservation={reservation} />
                        ))}
                    </div>
            )}
        </div>
    );
};
export default ListeReservation;