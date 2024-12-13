/* eslint-disable react/prop-types */
import { useState } from "react";
import ReservationsRequests from "../ReservationsRequests";
import Chambre from "../Chambre/Chambre";
import Client from "../Client/Client";

const Reservation = ({ reservation }) => {
    const { error, chambre, client, fetchChambre, fetchClient } = ReservationsRequests(reservation);

    const [clientVisible, setClientVisible] = useState(false);
    const [chambreVisible, setChambreVisible] = useState(false);

    const [loadingChambre, setLoadingChambre] = useState(false);
    const [loadingClient, setLoadingClient] = useState(false);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };
    if (error) {
        return <div>Error: {error}</div>;
    }

    const toggleInformationVisibility = (type) => {
        if (type === "client") {
            if (!client) {
                if (!loadingClient) {
                    setLoadingClient(true); 
                    fetchClient(); 
                    setClientVisible((prev) => !prev);
                }
            } else {
                setClientVisible((prev) => !prev);
            }
        } else if (type === "chambre") {
            if (!chambre) {
                if (!loadingChambre) {
                    setLoadingChambre(true);
                    fetchChambre();
                    setChambreVisible((prev) => !prev);
                }
            } else {
                setChambreVisible((prev) => !prev);
            }
        }
    };

    return (
        <>
            <div className="reservation-card">
                <h4>
                    Réservation du {formatDate(reservation.resDateDebut)} au {formatDate(reservation.resDateFin)}
                </h4>
                <p>{reservation.resPrixJour}$ par jour</p>
                <div>
                    <button className="button-info" onClick={() => toggleInformationVisibility("client")}>Client</button>
                    {clientVisible && (
                        <Client key={client.pkCliId} client={client} />
                    )}
                    <br />
                    <button className="button-info" onClick={() => toggleInformationVisibility("chambre")}>Chambre</button>
                    {chambreVisible && (
                        <Chambre key={chambre.pkChaId} chambre={chambre}/>
                    )}
                </div>
            </div >
        </>
    );
};

export default Reservation;
