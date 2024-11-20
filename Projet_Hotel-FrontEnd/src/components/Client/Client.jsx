/* eslint-disable react/prop-types */
const Client = ({ client }) => {
    return (
        <>
            <div className="reservation-card">
                <h4>{client.cliPrenom} {client.cliNom}</h4>
                <p>{client.cliCourriel}</p>
                <p>{client.cliTelephoneMobile}</p>
            </div>
        </>
    );
};

export default Client;
