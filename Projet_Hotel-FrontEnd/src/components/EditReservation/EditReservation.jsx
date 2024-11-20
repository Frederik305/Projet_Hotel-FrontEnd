import { useState } from "react";
import ReservationsRequests from "../ReservationsRequests";
import EditClient from '../Client/EditClient';
/* eslint-disable react/prop-types */

const Reservation = ({ reservation }) => {
    const { error, chambre, client, fetchChambre, fetchClient } = ReservationsRequests(reservation);
    const [clientVisible, setClientVisible] = useState(false);
    const [chambreVisible, setChambreVisible] = useState(false);

    const [loadingChambre, setLoadingChambre] = useState(false);
    const [loadingClient, setLoadingClient] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleModifierClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
    };


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
            <h4>{isEditing ? "Edit Reservation" : `${reservation.resDateDebut} au ${reservation.resDateFin}`}</h4>
            <p>{reservation.resPrixJour} par jour</p>
            <div>
                <button className="button-info" onClick={() => toggleInformationVisibility("client")}>Client</button>
                {clientVisible && (
                    <p>
                        <EditClient key={client.pkCliId} client={client} />
                    </p>
                )}
                <br />
                <button className="button-info" onClick={() => toggleInformationVisibility("chambre")}>Chambre</button>
                {chambreVisible && (
                    <p>
                        {/*<Chambre key={chambre.pkChaId} chambre={chambre} />*/}
                    </p>
                )}
            </div>


            {isEditing ? (
                <>
                    <div>
                        <label>Du:</label>
                        <input
                            type="text"
                            value={reservation.resDateDebut}
                            //onChange={(e) => setDu(e.target.value)}
                            placeholder={reservation.resDateDebut}
                        />
                    </div>
                    <div>
                        <label>Au:</label>
                        <input
                            type="text"
                            value={reservation.resDateFin}
                            //onChange={(e) => setAu(e.target.value)}
                            placeholder={reservation.resDateFin}
                        />
                    </div>
                    <div>
                        <label>Prix:</label>
                        <input
                            type="text"
                            value={reservation.resPrixJour}
                            //onChange={(e) => setPrix(e.target.value)}
                            placeholder={reservation.resPrixJour}
                        />
                    </div>
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                        <p>du {reservation.resDateDebut} au {reservation.resDateFin}</p>
                        <p>{reservation.resPrixJour}</p>
                </>
            )}

            <button onClick={handleModifierClick}>{isEditing ? 'Cancel' : 'Modifier'}</button>
            <button>Supprimer</button>
        </>
    );
};

export default Reservation;