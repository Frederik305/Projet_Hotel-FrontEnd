/* eslint-disable react/prop-types */
import Client from "./Client";

const ListeClient = ({ clients }) => {
    return (
        <>
            {clients.map((client, index) => (
                <Client key={index} client={client} />
            ))}
        </>
    );
};

export default ListeClient;
