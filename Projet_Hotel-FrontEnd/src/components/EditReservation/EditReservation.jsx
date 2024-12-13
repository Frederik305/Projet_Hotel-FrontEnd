import { useState } from "react";
import ReservationsRequests from "../ReservationsRequests";
import EditClient from '../Client/EditClient';
import EditChambre from '../Chambre/EditChambre'
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
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
    const [du, setDu] = useState(new Date(reservation.resDateDebut)); // Conversion en objet Date
    const [au, setAu] = useState(new Date(reservation.resDateFin));   // Conversion en objet Date
    const [prix, setPrix] = useState(reservation.resPrixJour);
    const [autre, setAutre] = useState(reservation.resAutre);
    const [deleted, setDeleted] = useState(false);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };
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
                const errorData = await response.json();
                throw new Error(errorData.message || 'Action impossible');
            }

            const data = await response.json();
            // Mettre à jour l'état avec les nouvelles données
            setDu(new Date(data.resDateDebut));
            setAu(new Date(data.resDateFin));
            setPrix(data.resPrixJour);
            setAutre(data.resAutre);

            // Si aucune erreur, on désactive le mode édition
            setIsEditing(false);
            setError(''); // Réinitialiser l'erreur

        } catch (err) {
            setError(err.message); // Afficher l'erreur
        }
    };

    const handleSave = () => {
        modifierReservation();
        // L'état d'édition ne sera mis à jour que si la sauvegarde réussit sans erreur
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
                const errorData = await response.json();
                throw new Error(errorData.message || 'Action impossible');
            }
            setError('');
            
            
        } catch (err) {
            setError(err.message);
            
        }
    }

    const handleModifierClick = () => {
        if (isEditing) {
            
            setDu(new Date(reservation.resDateDebut)); 
            setAu(new Date(reservation.resDateFin));   
            setPrix(reservation.resPrixJour);          
            setAutre(reservation.resAutre);            
        }
        setIsEditing(!isEditing); // Changer l'état d'édition
    };

    const handleSupprimerClick = () => {
        const confirmation = window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?');
        if (confirmation) {
            supprimerReservation();
            setDeleted(true);
        }
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
                            <DatePicker
                                selected={du}
                                onChange={(date) => setDu(date)}
                                dateFormat="dd MMMM yyyy"
                            />
                        </div>
                        <div>
                            <label>Date de fin:</label>
                            <DatePicker
                                selected={au}
                                onChange={(date) => setAu(date)}
                                dateFormat="dd MMMM yyyy"
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
                            <label>Autres informations:</label>
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
                            <h4>Réservation du {formatDate(du)} au {formatDate(au)}</h4>
                            <p>{prix}$ par jour</p>
                            <p>{autre}</p>
                            <button
                                className="button-info"
                                onClick={() => toggleInformationVisibility("client")}
                            >
                                {clientVisible ? "Cacher le client" : "Afficher le client"}
                            </button>
                            {clientVisible && (
                                <p>
                                    <EditClient key={client.pkCliId} client={client} />
                                </p>
                            )}
                            <button
                                className="button-info"
                                onClick={() => toggleInformationVisibility("chambre")}
                            >
                                {chambreVisible ? "Cacher la chambre" : "Afficher la chambre"}
                            </button>
                            {chambreVisible && (
                                <p>
                                    <EditChambre key={chambre.pkChaId} chambre={chambre} />
                                </p>
                            )}<button onClick={handleSupprimerClick}>Annuler la réservation</button>
                        </>
                    )}



                <button onClick={handleModifierClick}>{isEditing ? 'Annuler' : 'Modifier la réservation'}</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}



            </div>
        </>
    );
};

export default Reservation;
