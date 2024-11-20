import { useState } from 'react';

/* eslint-disable react/prop-types */
const EditClient = ({ client }) => {
    const [showAdressAndMobile, setIsShowing] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const handleModifierClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleShowClick = () => {
        setIsShowing(!showAdressAndMobile);
    };

    return (
        <>
            <h4>{isEditing ? `Edit Client: ${client.cliPrenom} ${client.cliNom}` : `${client.cliPrenom} ${client.cliNom}`}</h4>
            <div>{isEditing ? "" : 
            <div>
                <button onClick={handleShowClick}>{showAdressAndMobile ? 'more info →' : 'more info ↓'}</button>
                    <p>{showAdressAndMobile ? '' : `${client.cliCourriel}`}</p>
                    <p>{showAdressAndMobile ? '' : `${client.cliTelephoneMobile}`}</p>
            </div>}</div>
            

            {isEditing ? (
                <>
                    <div>
                        <label>Prenom:</label>
                        <input
                            type="text"
                            value={client.cliPrenom}
                            //onChange={(e) => setPrenom(e.target.value)}
                            placeholder={client.cliPrenom}
                        />
                    </div>
                    <div>
                        <label>Nom:</label>
                        <input
                            type="text"
                            value={client.cliNom}
                            //onChange={(e) => setNom(e.target.value)}
                            placeholder={client.cliNom}
                        />
                    </div>
                    <div>
                        <label>Adresse:</label>
                        <input
                            type="text"
                            value={client.cliCourriel}
                            //onChange={(e) => setAdresse(e.target.value)}
                            placeholder={client.cliCourriel}
                        />
                    </div>
                    <div>
                        <label>Mobile:</label>
                        <input
                            type="text"
                            value={client.cliTelephoneMobile}
                            //onChange={(e) => setMobile(e.target.value)}
                            placeholder={client.cliTelephoneMobile}
                        />
                    </div>
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                        <p>{client.cliPrenom} {client.cliNom}</p>
                        <p>{client.cliCourriel}</p>
                        <p>{client.cliTelephoneMobile}</p>
                </>
            )}

            <button onClick={handleModifierClick}>{isEditing ? 'Cancel' : 'Modifier'}</button>
            <button>Supprimer</button>
        </>
    );
};

export default EditClient;
