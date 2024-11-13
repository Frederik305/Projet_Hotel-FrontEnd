import { useState } from "react";
import ListeClient from "./ListeClient";

const clients = [{
    id: "1",
    prenom: "Jean",
    nom: "Saisrien",
    adresse: "1234 rue Des Tulipes, Gaspé",
    mobile: "418-123-4567",
},
{
    id: "2",
    prenom: "Paul",
    nom: "Therrien",
    adresse: "6789 rue Des Érables, Matane",
    mobile: "418-456-1234",
}];

const RechercheClient = () => {
    const [clientsList, setClientsList] = useState([]);

    const rechercheClients = () => {
        setClientsList(clients);
    };

    const effacerClients = () => {
        setClientsList([]);
    };

    return (
        <>
            <button onClick={rechercheClients}>Rechercher</button>
            <button onClick={effacerClients}>Effacer</button>
            {clientsList.length > 0 && <ListeClient clients={clientsList} />}
        </>
    );
};

export default RechercheClient;
