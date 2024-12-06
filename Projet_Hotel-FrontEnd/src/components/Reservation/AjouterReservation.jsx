import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AjouterReservation = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [du, setDu] = useState('');
    const [au, setAu] = useState('');
    const [prix, setPrix] = useState('');
    const [autre, setAutre] = useState('');
    const [fkCliId, setFkCliId] = useState('');
    const [fkChaId, setFkChaId] = useState('');

    const [clientNom, setClientNom] = useState('');
    const [chambreNum, setChambreNum] = useState('');


    const ajouterReservation = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/Reservation/modifierReservation`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pkResId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    resDateDebut: du,
                    resDateFin: au,
                    resPrixJour: prix,
                    resAutre: autre,
                    fkCliId: fkCliId,
                    fkChaId: fkChaId,
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
    }

    const fetchChambre = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/GetChambreByNum?ChaNumero=${chambreNum}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erreur de récupération des réservations');
            }

            const data = await response.json();
            setFkChaId(data.pkChaId);
        } catch (err) {
            setError(err.message);
            //navigate('/login');
        }
    };

    const fetchClient = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/Client/GetClientById?CliNom=${clientNom}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erreur de récupération des réservations');
            }

            const data = await response.json();
            setFkCliId(data.pkCliId);
        } catch (err) {
            setError(err.message);
            //navigate('/login');
        }
    };

    const handleSave = () => {
        fetchChambre();
        fetchClient();
        ajouterReservation();
    };
    if (error) {
        return (
            <div><h3>{error}</h3></div>
        )
    }

    return (
        <>
            <h1>{fkChaId}</h1>
            <h4>Ajouter Reservation</h4>
            <div>
                <label>Du:</label>
                <input
                    type="text"
                    value={du}
                    onChange={(e) => setDu(e.target.value)}
                    placeholder={du}
                />
            </div>
            <div>
                <label>Au:</label>
                <input
                    type="text"
                    value={au}
                    onChange={(e) => setAu(e.target.value)}
                    placeholder={au}
                />
            </div>
            <div>
                <label>Prix:</label>
                <input
                    type="text"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    placeholder={prix}
                />
            </div>
            <div>
                <label>Autre:</label>
                <input
                    type="text"
                    value={autre}
                    onChange={(e) => setAutre(e.target.value)}
                    placeholder={autre}
                />
            </div>
            <div>
                <label>Client:</label>
                <input
                    type="text"
                    value={clientNom}
                    onChange={(e) => setClientNom(e.target.value)}
                    placeholder={clientNom}
                />
            </div>
            <div>
                <label>Chambre:</label>
                <input
                    type="text"
                    value={chambreNum}
                    onChange={(e) => setChambreNum(e.target.value)}
                    placeholder={chambreNum}
                />
            </div>
          
            <button onClick={handleSave}>Save</button>
        </>
    );
}

export default AjouterReservation;