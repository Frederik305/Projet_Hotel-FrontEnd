/* eslint-disable react/prop-types */
//import Reservation from "./Reservation";
import EditReservation from "./EditReservation"

const ListeReservation = ({ reservations }) => {
    return (
        <>
            {/*reservations.map((reservation, index) => (
                <Reservation key={index} reservation={reservation} />
            ))*/}
            {reservations.map((reservation, index) => (
                <EditReservation key={index} reservation={reservation} />
            ))}
        </>
    );
};

export default ListeReservation;