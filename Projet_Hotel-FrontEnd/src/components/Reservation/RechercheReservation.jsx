import { useState } from "react";
import ListeReservation from "./ListeReservation";
//import logoChambre from "../../logo/chambreDouble.jpeg";
//import logoChambre2 from "../../logo/chambreKing.jpeg";

const reservations = [{
    du: "15 décembre 2024",
    au: "24 décembre 2024",
    prix: "129.99",
    pkCliId: "1",
    pkChaId: "1"
},
{
    du: "25 décembre 2024",
    au: "31 décembre 2024",
    prix: "159.99",
    pkCliId: "2",
    pkChaId: "2"
}];

const RechercheReservation = () => {
    const [reservationsList, setReservationsList] = useState([]);

    const rechercheReservations = () => {
        setReservationsList(reservations);
    };

    const effacerReservations = () => {
        setReservationsList([]);
    };

    return (
        <>
            <button onClick={rechercheReservations}>Rechercher</button>
            <button onClick={effacerReservations}>Effacer</button>
            {reservationsList.length > 0 && <ListeReservation reservations={reservationsList} />}
        </>
    );
};

export default RechercheReservation;
