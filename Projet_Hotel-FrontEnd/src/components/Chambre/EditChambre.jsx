/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditChambre = ({ chambre }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showInfoDivers, setInfoDivers] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [numero, setNumero] = useState(chambre.chaNumero);
    const [autres, setAutres] = useState(chambre.chaAutreInfo);

    const modifierChambre = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/Chambre/modifierChambre`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pkChaId: chambre.pkChaId,
                    chaNumero: numero,
                    chaEtat: chambre.chaEtat,
                    chaAutreInfo: autres,
                    fkTypId: chambre.fkTypId,
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
        modifierChambre();
        setIsEditing(false);
    };

    const handleShowClick = () => {
        setInfoDivers(!showInfoDivers);
    };

    if (error) {
        return (
            <div><h3>{ error }</h3></div>
        )
    }

    return (
        <>
            <div>{isEditing ? <>
                <h4>Edit Chambre: {chambre.chaNumero}</h4>
                <div>
                    <label>Numéro de Chambre:</label>
                    <input
                        type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        placeholder={numero}
                    />
                </div>
                <div>
                    <label>Autres Infos:</label>
                    <input
                        type="text"
                        value={autres}
                        onChange={(e) => setAutres(e.target.value)}
                        placeholder={autres}
                    />
                </div>
                <button onClick={handleSave}>Save</button>
            </> : <div>
                <h4>{chambre.chaNumero}</h4>
                <button onClick={handleShowClick}>{showInfoDivers ? 'more info →' : 'more info ↓'}</button>
                <p>{showInfoDivers ? '' : `${chambre.chaAutreInfo}`}</p>
            </div>}</div>

            <button onClick={handleModifierClick}>{isEditing ? 'Cancel' : 'Modifier'}</button>
        </>
    );
}

export default EditChambre;