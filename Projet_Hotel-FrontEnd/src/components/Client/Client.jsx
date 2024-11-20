/* eslint-disable react/prop-types */
const Client = ({ client }) => {
    return (
        <>
            <h4>{client.prenom} {client.nom}</h4>
            <p>{client.adresse}</p>
            <p>{client.mobile}</p>
        </>
    );
};

export default Client;
