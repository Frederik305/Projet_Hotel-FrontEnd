/* eslint-disable react/prop-types */
//import Client from "./Client";
import EditClient from "./EditClient"

const ListeClient = ({ clients }) => {
    return (
        <>
            {/*clients.map((client, index) => (
                <Client key={index} client={client} />
            ))*/}
            {clients.map((client, index) => (
                <EditClient key={index} client={client} />
            ))}
        </>
    );
};

export default ListeClient;
