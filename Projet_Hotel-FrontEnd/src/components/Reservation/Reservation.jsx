/* eslint-disable react/prop-types */
// Importation des dépendances nécessaires
import { useState } from "react";
import ReservationsRequests from "../ReservationsRequests";
import Chambre from "../Chambre/Chambre";
import Client from "../Client/Client";

const Reservation = ({ reservation }) => {
    // Gestion des données liées à la réservation via un hook personnalisé
    const { error, chambre, client, fetchChambre, fetchClient } = ReservationsRequests(reservation);

    // États pour la visibilité et le chargement des données du client et de la chambre
    const [clientVisible, setClientVisible] = useState(false);
    const [chambreVisible, setChambreVisible] = useState(false);
    const [loadingChambre, setLoadingChambre] = useState(false);
    const [loadingClient, setLoadingClient] = useState(false);

    // Formatte une date dans le style français (ex: "15 octobre 2024")
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    // Affiche une erreur si elle est présente
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Gère la visibilité des informations du client ou de la chambre
    const toggleInformationVisibility = (type) => {
        if (type === "client") {
            if (!client) {
                if (!loadingClient) {
                    setLoadingClient(true);
                    fetchClient(); // Charge les données du client si elles ne sont pas encore récupérées
                    setClientVisible((prev) => !prev);
                }
            } else {
                setClientVisible((prev) => !prev); // Bascule la visibilité
            }
        } else if (type === "chambre") {
            if (!chambre) {
                if (!loadingChambre) {
                    setLoadingChambre(true);
                    fetchChambre(); // Charge les données de la chambre si elles ne sont pas encore récupérées
                    setChambreVisible((prev) => !prev);
                }
            } else {
                setChambreVisible((prev) => !prev); // Bascule la visibilité
            }
        }
    };

    // Affichage principal avec les informations de la réservation
    return (
        <>
            <div className="reservation-card">
                <h4>
                    Réservation du {formatDate(reservation.resDateDebut)} au {formatDate(reservation.resDateFin)}
                </h4>
                <p>{reservation.resPrixJour}$ par jour</p>
                <div>
                    {/* Bouton pour afficher ou masquer les informations du client */}
                    <button className="button-info" onClick={() => toggleInformationVisibility("client")}>Client</button>
                    {clientVisible && (
                        <Client key={client.pkCliId} client={client} />
                    )}
                    <br />
                    {/* Bouton pour afficher ou masquer les informations de la chambre */}
                    <button className="button-info" onClick={() => toggleInformationVisibility("chambre")}>Chambre</button>
                    {chambreVisible && (
                        <Chambre key={chambre.pkChaId} chambre={chambre} />
                    )}
                </div>
            </div>
        </>
    );
};

export default Reservation;
