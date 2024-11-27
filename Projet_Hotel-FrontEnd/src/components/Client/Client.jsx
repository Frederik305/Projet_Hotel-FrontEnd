/* eslint-disable react/prop-types */
const Client = ({ client }) => {
    return (
        <>
            <div className="card">
                <h4>{client.cliPrenom} {client.cliNom}</h4>
                <p>Courriel: {client.cliCourriel}</p>
                <p>T&eacute;l&eacute;phone: {client.cliTelephoneMobile}</p>
            </div>
        </>
    );
};

export default Client;
