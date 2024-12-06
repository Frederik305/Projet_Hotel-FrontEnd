import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const AjouterReservation = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [du, setDu] = useState(null);
    const [au, setAu] = useState(null);
    const [prix, setPrix] = useState('');
    const [autre, setAutre] = useState('');

    const [clientCourriel, setClientCourriel] = useState('');
    const [chambreNum, setChambreNum] = useState('');

    const ajouterReservation = async (fkCliId, fkChaId) => {
        const formattedStartDate = du ? format(du, "yyyy-MM-dd'T'HH:mm:ss") : "";
        const formattedEndDate = au ? format(au, "yyyy-MM-dd'T'HH:mm:ss") : "";
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/Reservation/ajouterReservation`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pkResId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    resDateDebut: formattedStartDate,
                    resDateFin: formattedEndDate,
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
                throw new Error('Erreur de r�cup�ration des r�servations');
            }

            const data = await response.json();
            return data[0].pkChaId;
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
            const url = `http://localhost:5292/Client/GetClientByEmail?CliCourriel=${clientCourriel}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erreur de r�cup�ration des r�servations');
            }

            const data = await response.json();
            return data[0].pkCliId;
        } catch (err) {
            setError(err.message);
            //navigate('/login');
        }
    };

    const handleSave = async () => {
        try {
            const [fkChaId, fkCliId] = await Promise.all([fetchChambre(), fetchClient()]);

            if (fkChaId && fkCliId) {
                await ajouterReservation(fkCliId, fkChaId);
            } else {
                throw new Error("Unable to fetch required data for reservation.");
            }
        } catch (error) {
            setError(error.message);
        }
    };
    if (error) {
        return (
            <div><h3>{error}</h3></div>
        )
    }

    return (
        <>
            <h4>Ajouter Reservation</h4>
            <div>
            <label>Date de d&eacute;but:</label>
            <DatePicker
                selected={du}
                onChange={(date) => setDu(date)}

                dateFormat="yyyy-MM-dd" // Format de la date
                isClearable // Ajoute une ic�ne pour effacer la s�lection
                placeholderText="Choisissez la date de d&eacute;but de la r&eacute;servation"
                />
            </div>
            <div>
            <label>Date de fin:</label>
            <DatePicker
                selected={au}
                onChange={(date) => setAu(date)}

                dateFormat="yyyy-MM-dd" // Format de la date
                isClearable // Ajoute une ic�ne pour effacer la s�lection
                placeholderText="Choisissez la date de fin de la r&eacute;servation"
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
                <label>Courriel Client:</label>
                <input
                    type="text"
                    value={clientCourriel}
                    onChange={(e) => setClientCourriel(e.target.value)}
                    placeholder={clientCourriel}
                />
            </div>
            <div>
                <label>Numero de Chambre:</label>
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