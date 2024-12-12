import { useState } from "react";
import ListeClient from "./ListeClient";



const RechercheClient = () => {
    const [clientsList, setClientsList] = useState([]);

    const rechercheClients = () => {
        //setClientsList(clients);
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
