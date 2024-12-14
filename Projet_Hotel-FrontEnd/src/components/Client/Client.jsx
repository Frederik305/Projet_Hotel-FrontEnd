/* eslint-disable react/prop-types */
// Composant fonctionnel pour afficher les informations d'un client
const Client = ({ client }) => {
    return (
        <>
            <div className="card">
                {/* Affiche le nom complet du client */}
                <h4>{client.cliPrenom} {client.cliNom}</h4>
                {/* Affiche les coordonnées du client */}
                <p>Courriel: {client.cliCourriel}</p>
                <p>T&eacute;l&eacute;phone: {client.cliTelephoneMobile}</p>
            </div>
        </>
    );
};

export default Client;
