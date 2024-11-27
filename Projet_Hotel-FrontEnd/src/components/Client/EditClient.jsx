import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
const EditClient = ({ client }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showAdressAndMobile, setIsShowing] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [prenom, setPrenom] = useState(client.cliPrenom);
    const [nom, setNom] = useState(client.cliNom);
    const [courriel, setCourriel] = useState(client.cliCourriel);
    const [mobile, setMobile] = useState(client.cliTelephoneMobile);
    const [addresse, setAddresse] = useState(client.cliAddresseResidence);
    const [password, setPassword] = useState(client.cliMotDePasse);

    const postClient = async (prenom, nom, addresse, mobile, courriel, password) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/Client/ModifierClient`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pkCliId: client.pkCliId,
                    cliPrenom: prenom,
                    cliNom: nom,
                    cliAddresseResidence: addresse,
                    cliTelephoneMobile: mobile,
                    cliCourriel: courriel,
                    cliMotDePasse: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData.message || 'Action impossible');
            }

        } catch (err) {
            setError(err.message);
            //navigate('/login');
        }
    };

    const handleModifierClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        postClient(prenom, nom, addresse, mobile, courriel, password);
        setIsEditing(false);
    };

    const handleShowClick = () => {
        setIsShowing(!showAdressAndMobile);
    };

    return (
        <>
            <div>{isEditing ? <>
                <h4>Edit Client: {prenom} {nom}</h4>
                <div>
                    <label>Prenom:</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder={prenom}
                    />
                </div>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder={nom}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={addresse}
                        onChange={(e) => setAddresse(e.target.value)}
                        placeholder={addresse}
                    />
                </div>
                <div>
                    <label>Courriel:</label>
                    <input
                        type="text"
                        value={courriel}
                        onChange={(e) => setCourriel(e.target.value)}
                        placeholder={courriel}
                    />
                </div>
                <div>
                    <label>Mobile:</label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder={mobile}
                    />
                </div>
                <div>
                    <label>Mot De Passe:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={password}
                    />
                </div>
                <button onClick={handleSave}>Save</button>
            </> : <div>
                <h4>{prenom} {nom}</h4>
                <button onClick={handleShowClick}>{showAdressAndMobile ? 'more info →' : 'more info ↓'}</button>
                <p>{showAdressAndMobile ? '' : `${addresse}`}</p>
                <p>{showAdressAndMobile ? '' : `${courriel}`}</p>
                <p>{showAdressAndMobile ? '' : `${mobile}`}</p>
            </div>}</div>

            <button onClick={handleModifierClick}>{isEditing ? 'Cancel' : 'Modifier'}</button>
            <button>Supprimer</button>
        </>
    );
};

export default EditClient;
