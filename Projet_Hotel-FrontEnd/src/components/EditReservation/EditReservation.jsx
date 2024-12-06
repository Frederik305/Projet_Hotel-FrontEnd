import { useState } from "react";
import ReservationsRequests from "../ReservationsRequests";
import EditClient from '../Client/EditClient';
import EditChambre from '../Chambre/EditChambre'
import { useNavigate } from 'react-router-dom';
/* eslint-disable react/prop-types */

const Reservation = ({ reservation }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { chambre, client, fetchChambre, fetchClient } = ReservationsRequests(reservation);
    const [clientVisible, setClientVisible] = useState(false);
    const [chambreVisible, setChambreVisible] = useState(false);

    const [loadingChambre, setLoadingChambre] = useState(false);
    const [loadingClient, setLoadingClient] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [du, setDu] = useState(reservation.resDateDebut);
    const [au, setAu] = useState(reservation.resDateFin);
    const [prix, setPrix] = useState(reservation.resPrixJour);
    const [autre, setAutre] = useState(reservation.resAutre);
    const [deleted, setDeleted] = useState(false);

    const modifierReservation = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/Reservation/modifierReservation`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pkResId: reservation.pkResId,
                    resDateDebut: du,
                    resDateFin: au,
                    resPrixJour: prix,
                    resAutre: autre,
                    fkCliId: reservation.fkCliId,
                    fkChaId: reservation.fkChaId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData.message || 'Action impossible');
            }

        } catch (err) {
            setError(err.message);
            //navigate('/login');
        }
    };

    const supprimerReservation = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/Reservation/annulerReservation`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pkResId: reservation.pkResId,
                    resDateDebut: du,
                    resDateFin: au,
                    resPrixJour: prix,
                    resAutre: autre,
                    fkCliId: reservation.fkCliId,
                    fkChaId: reservation.fkChaId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData.message || 'Action impossible');
            }

        } catch (err) {
            setError(err.message);
            //navigate('/login');
        }
    }

    const handleModifierClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSupprimerClick = () => {
        supprimerReservation();
        setDeleted(true);
    };

    const handleSave = () => {
        modifierReservation();
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

    if (error) {
        return (
            <div><h3>{error}</h3></div>
        )
    }

    if (deleted) {
        return (<></>)
    }

    return (
        <>

            <div className="reservation-card"> 
       
            {isEditing ? 
                <>
                <h4>Modifier Reservation</h4>
                <div>
                    <label>Date de début:</label>
                    <input
                        type="text"
                        value={du}
                        onChange={(e) => setDu(e.target.value)}
                        placeholder={du}
                    />
                </div>
                <div>
                    <label>Date de fin:</label>
                    <input
                        type="text"
                        value={au}
                        onChange={(e) => setAu(e.target.value)}
                        placeholder={au}
                    />
                </div>
                <div>
                    <label>Prix par jour:</label>
                    <input
                        type="text"
                        value={prix}
                        onChange={(e) => setPrix(e.target.value)}
                        placeholder={prix}
                    />
                </div>
                <div>
                    <label>Autres information:</label>
                    <input
                        type="text"
                        value={autre}
                        onChange={(e) => setAutre(e.target.value)}
                        placeholder={autre}
                    />
                </div>
                <button onClick={handleSave}>Sauvegarder</button>
            </> : (
                <>
                    <h4>{reservation.resDateDebut} au {reservation.resDateFin}</h4>
                    <p>{reservation.resPrixJour}$ par jour</p>
                    <p>{reservation.resAutre}</p>
                    <button className="button-info" onClick={() => toggleInformationVisibility("client")}>
                        Afficher le client
                    </button>
                    {clientVisible && (
                        <p>
                            <EditClient key={client.pkCliId} client={client} />
                        </p>
                    )}
                    <button className="button-info" onClick={() => toggleInformationVisibility("chambre")}>
                        Afficher la chambre
                    </button>
                    {chambreVisible && (
                        <p>
                            <EditChambre key={chambre.pkChaId} chambre={chambre} />
                        </p>
                    )}<button onClick={handleSupprimerClick}>Canceler la réservation</button>
                </>
            )}
            

                <button onClick={handleModifierClick}>{isEditing ? 'Cancel' : 'Modifier la réservation'}</button>
                

            </div>
        </>
    );
};

export default Reservation;