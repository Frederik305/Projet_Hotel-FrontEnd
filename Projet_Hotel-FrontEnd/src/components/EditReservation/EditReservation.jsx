/* eslint-disable react/prop-types */
import { useState } from "react";
import ReservationsRequests from "../ReservationsRequests";
import EditClient from '../Client/EditClient';
import EditChambre from '../Chambre/EditChambre'
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Reservation = ({ reservation }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');                                                     // Stocke les erreurs éventuelles
    const { chambre, client, fetchChambre, fetchClient } = ReservationsRequests(reservation);   // Utilisation des hooks personnalisés pour les données de la réservation
    const [clientVisible, setClientVisible] = useState(false);                                  // Gère la visibilité de l'information du client
    const [chambreVisible, setChambreVisible] = useState(false);                                // Gère la visibilité de l'information de la chambre

    const [loadingChambre, setLoadingChambre] = useState(false);                                // Indicateur de chargement pour la chambre
    const [loadingClient, setLoadingClient] = useState(false);                                  // Indicateur de chargement pour le client

    const [isEditing, setIsEditing] = useState(false);                                          // Si on est en mode édition ou non
    const [du, setDu] = useState(new Date(reservation.resDateDebut));                           // Date de début de la réservation
    const [au, setAu] = useState(new Date(reservation.resDateFin));                             // Date de fin de la réservation
    const [prix, setPrix] = useState(reservation.resPrixJour);                                  // Prix par jour de la réservation
    const [autre, setAutre] = useState(reservation.resAutre);                                   // Autres informations relatives à la réservation
    const [deleted, setDeleted] = useState(false);                                              // Indicateur si la réservation a été annulée

    // Format de la date pour l'affichage
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    // Fonction pour modifier la réservation via l'API
    const modifierReservation = async () => {
        const token = localStorage.getItem('accessToken'); // Récupère le token pour l'authentification
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
                    'Authorization': `Bearer ${token}`, // Envoie le token dans les en-têtes pour l'authentification
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
            // Mettre à jour les valeurs des champs après modification
            setDu(new Date(data.resDateDebut));
            setAu(new Date(data.resDateFin));
            setPrix(data.resPrixJour);
            setAutre(data.resAutre);

            // Désactive le mode édition si la sauvegarde réussie
            setIsEditing(false);
            setError(''); // Réinitialise l'erreur
        } catch (err) {
            setError(err.message); // Gère l'affichage des erreurs
        }
    };

    // Fonction appelée lors de l'enregistrement de la modification
    const handleSave = () => {
        modifierReservation();
    };

    // Fonction pour supprimer une réservation
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
                    'Authorization': `Bearer ${token}`, // Envoie du token dans l'en-tête
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
            setError(err.message); // Gestion des erreurs pendant la suppression
        }
    };

    // Fonction appelée lors du clic sur "Modifier"
    const handleModifierClick = () => {
        if (isEditing) {
            // Restaure les anciennes valeurs de la réservation si on annule l'édition
            setDu(new Date(reservation.resDateDebut));
            setAu(new Date(reservation.resDateFin));
            setPrix(reservation.resPrixJour);
            setAutre(reservation.resAutre);
        }
        setIsEditing(!isEditing); // Modifie l'état d'édition
    };

    // Fonction pour gérer la suppression de la réservation après confirmation
    const handleSupprimerClick = () => {
        const confirmation = window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?');
        if (confirmation) {
            supprimerReservation();
            setDeleted(true); // Indique que la réservation a été supprimée
        }
    };

    // Fonction pour afficher ou masquer les informations sur le client ou la chambre
    const toggleInformationVisibility = (type) => {
        if (type === "client") {
            if (!client) {
                if (!loadingClient) {
                    setLoadingClient(true); // Chargement des données du client
                    fetchClient();
                    setClientVisible((prev) => !prev);
                }
            } else {
                setClientVisible((prev) => !prev);
            }
        } else if (type === "chambre") {
            if (!chambre) {
                if (!loadingChambre) {
                    setLoadingChambre(true); // Chargement des données de la chambre
                    fetchChambre();
                    setChambreVisible((prev) => !prev);
                }
            } else {
                setChambreVisible((prev) => !prev);
            }
        }
    };

    // Si la réservation a été supprimée, on ne rend rien
    if (deleted) {
        return (<></>);
    }

    return (
        <div className="reservation-card">
            {isEditing ? (
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
                </>
            ) : (
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
                    )}
                    <button onClick={handleSupprimerClick}>Annuler la réservation</button>
                </>
            )}

            <button onClick={handleModifierClick}>{isEditing ? 'Annuler' : 'Modifier la réservation'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affiche l'erreur si nécessaire */}
        </div>
    );
};

export default Reservation;
