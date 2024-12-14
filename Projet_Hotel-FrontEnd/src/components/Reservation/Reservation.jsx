/* eslint-disable react/prop-types */
// Importation des d�pendances n�cessaires
import { useState } from "react";
import ReservationsRequests from "../ReservationsRequests";
import Chambre from "../Chambre/Chambre";
import Client from "../Client/Client";

const Reservation = ({ reservation }) => {
    // Gestion des donn�es li�es � la r�servation via un hook personnalis�
    const { error, chambre, client, fetchChambre, fetchClient } = ReservationsRequests(reservation);

    // �tats pour la visibilit� et le chargement des donn�es du client et de la chambre
    const [clientVisible, setClientVisible] = useState(false);
    const [chambreVisible, setChambreVisible] = useState(false);
    const [loadingChambre, setLoadingChambre] = useState(false);
    const [loadingClient, setLoadingClient] = useState(false);

    // Formatte une date dans le style fran�ais (ex: "15 octobre 2024")
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    // Affiche une erreur si elle est pr�sente
    if (error) {
        return <div>Error: {error}</div>;
    }

    // G�re la visibilit� des informations du client ou de la chambre
    const toggleInformationVisibility = (type) => {
        if (type === "client") {
            if (!client) {
                if (!loadingClient) {
                    setLoadingClient(true);
                    fetchClient(); // Charge les donn�es du client si elles ne sont pas encore r�cup�r�es
                    setClientVisible((prev) => !prev);
                }
            } else {
                setClientVisible((prev) => !prev); // Bascule la visibilit�
            }
        } else if (type === "chambre") {
            if (!chambre) {
                if (!loadingChambre) {
                    setLoadingChambre(true);
                    fetchChambre(); // Charge les donn�es de la chambre si elles ne sont pas encore r�cup�r�es
                    setChambreVisible((prev) => !prev);
                }
            } else {
                setChambreVisible((prev) => !prev); // Bascule la visibilit�
            }
        }
    };

    // Affichage principal avec les informations de la r�servation
    return (
        <>
            <div className="reservation-card">
                <h4>
                    R�servation du {formatDate(reservation.resDateDebut)} au {formatDate(reservation.resDateFin)}
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
