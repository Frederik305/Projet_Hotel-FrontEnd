import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const AjouterReservation = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Nouvel état pour le message de succès
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
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            setError('');
            setSuccessMessage('Réservation ajoutée avec succès !'); // Message de succès

        } catch (err) {
            setError(err.message); // En cas d'erreur, afficher le message d'erreur
            setSuccessMessage(''); // Réinitialiser le message de succès en cas d'erreur
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
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            return data[0].pkChaId;
        } catch (err) {
            setError(err.message);
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
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            return data.pkCliId;
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSave = async () => {
        
            const [fkChaId, fkCliId] = await Promise.all([fetchChambre(), fetchClient()]);

            if (fkChaId && fkCliId) {
                await ajouterReservation(fkCliId, fkChaId);
            } 
        
    };

    return (
        <main>
            <div className="containerSearch">
                <div className="form-search">
                    <h2>Ajouter Reservation</h2>
                    <label>Date de début:</label>
                    <div>
                    
                        <DatePicker
                            selected={du}
                            onChange={(date) => setDu(date)}
                            dateFormat="yyyy-MM-dd"
                            isClearable
                            placeholderText="Choisissez la date de début de la réservation"
                        />
                    </div>
                    <label>Date de fin:</label>
                    <div>
                    
                        <DatePicker
                            selected={au}
                            onChange={(date) => setAu(date)}
                            dateFormat="yyyy-MM-dd"
                            isClearable
                            placeholderText="Choisissez la date de fin de la réservation"
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
                        <label>Numéro de Chambre:</label>
                        <input
                            type="text"
                            value={chambreNum}
                            onChange={(e) => setChambreNum(e.target.value)}
                            placeholder={chambreNum}
                        />
                    </div>

                    <button onClick={handleSave}>Save</button>

                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>} {/* Afficher le message de succès */}
                </div>
            </div>
        </main>
    );
}

export default AjouterReservation;
