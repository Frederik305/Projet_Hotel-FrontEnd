import { useState } from 'react';

/* eslint-disable react/prop-types */
const Client = ({ client }) => {
    const [showAdressAndMobile, setIsShowing] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [mobile, setMobile] = useState('');

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
            <h4>{isEditing ? `Edit Client: ${client.prenom} ${client.nom}` : `${client.prenom} ${client.nom}`}</h4>
            <div>{isEditing ? "" : 
            <div>
                <button onClick={handleShowClick}>{showAdressAndMobile ? 'more info →' : 'more info ↓'}</button>
                <p>{showAdressAndMobile ? '' : `${client.adresse}`}</p>
                <p>{showAdressAndMobile ? '' : `${client.mobile}`}</p>
            </div>}</div>
            

            {isEditing ? (
                <>
                    <div>
                        <label>Prenom:</label>
                        <input
                            type="text"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            placeholder={client.prenom}
                        />
                    </div>
                    <div>
                        <label>Nom:</label>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            placeholder={client.nom}
                        />
                    </div>
                    <div>
                        <label>Adresse:</label>
                        <input
                            type="text"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                            placeholder={client.adresse}
                        />
                    </div>
                    <div>
                        <label>Mobile:</label>
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder={client.mobile}
                        />
                    </div>
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <p>{prenom} {nom}</p>
                    <p>{adresse}</p>
                    <p>{mobile}</p>
                </>
            )}

            <button onClick={handleModifierClick}>{isEditing ? 'Cancel' : 'Modifier'}</button>
            <button>Supprimer</button>
        </>
    );
};

export default Client;
