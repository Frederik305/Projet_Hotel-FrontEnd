/* eslint-disable react/prop-types */
import Reservation from "./Reservation";

const ListeReservation = ({ reservations }) => {
    return (
        <>
            {reservations.map((reservation, index) => (
                <Reservation key={index} reservation={reservation} />
            ))}
        </>
    );
};

export default ListeReservation;