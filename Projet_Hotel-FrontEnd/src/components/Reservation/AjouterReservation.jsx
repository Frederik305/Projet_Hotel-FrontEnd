import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const AjouterReservation = () => {
    const navigate = useNavigate();                                 // Utilisé pour naviguer vers d'autres pages de l'application
    const [error, setError] = useState('');                         // Pour gérer les erreurs
    const [successMessage, setSuccessMessage] = useState('');       // Pour afficher un message de succès
    const [du, setDu] = useState(null);                             // Date de début
    const [au, setAu] = useState(null);                             // Date de fin
    const [prix, setPrix] = useState('');                           // Prix de la réservation
    const [autre, setAutre] = useState('');                         // Autres détails supplémentaires de la réservation
    const [clientCourriel, setClientCourriel] = useState('');       // Email du client
    const [chambreNum, setChambreNum] = useState('');               // Numéro de la chambre

    // Fonction pour ajouter une réservation
    const ajouterReservation = async (fkCliId, fkChaId) => {
        const formattedStartDate = du ? format(du, "yyyy-MM-dd'T'HH:mm:ss") : "";
        const formattedEndDate = au ? format(au, "yyyy-MM-dd'T'HH:mm:ss") : "";
        const token = localStorage.getItem('accessToken'); // Récupération du token d'authentification
        if (!token) {
            navigate('/login'); // Redirige si pas de token
            return;
        }
        try {
            // Envoi de la demande POST pour ajouter la réservation
            const url = `http://localhost:5292/Reservation/ajouterReservation`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ajout du token dans l'entête
                },
                body: JSON.stringify({
                    pkResId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    resDateDebut: formattedStartDate,                   // Date de début formatée
                    resDateFin: formattedEndDate,                       // Date de fin formatée
                    resPrixJour: prix,                                  // Prix
                    resAutre: autre,                                    // Autres détails
                    fkCliId: fkCliId,                                   // ID du client
                    fkChaId: fkChaId,                                   // ID de la chambre
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message); // Gestion des erreurs de l'API
            }
            setError('');
            setSuccessMessage('Réservation ajoutée avec succès !');
        } catch (err) {
            setError(err.message);
            setSuccessMessage('');
        }
    };

    // Fonction pour récupérer l'ID de la chambre en fonction du numéro
    const fetchChambre = async () => {
        const token = localStorage.getItem('accessToken'); // Récupération du token d'authentification
        if (!token) {
            navigate('/login'); // Redirige si pas de token
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
                throw new Error(errorData.message); // Gestion des erreurs
            }

            const data = await response.json();
            return data[0].pkChaId; // Retourne l'ID de la chambre
        } catch (err) {
            setError(err.message); // En cas d'erreur, afficher le message d'erreur
        }
    };

    // Fonction pour récupérer l'ID du client en fonction de son email
    const fetchClient = async () => {
        const token = localStorage.getItem('accessToken'); // Récupération du token d'authentification
        if (!token) {
            navigate('/login'); // Redirige si pas de token
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
                throw new Error(errorData.message); // Gestion des erreurs
            }

            const data = await response.json();
            return data.pkCliId; // Retourne l'ID du client
        } catch (err) {
            setError(err.message); // En cas d'erreur, afficher le message d'erreur
        }
    };

    // Fonction de sauvegarde qui combine la récupération des données de la chambre et du client, puis ajoute la réservation
    const handleSave = async () => {
        const [fkChaId, fkCliId] = await Promise.all([fetchChambre(), fetchClient()]); // Attendre les deux fetch simultanément
        if (fkChaId && fkCliId) {
            await ajouterReservation(fkCliId, fkChaId); // Ajouter la réservation si les ID sont récupérés
        }
    };

    return (
        <main>
            <div className="containerSearch">
                <div className="form-search">
                    <h2>Ajouter Reservation</h2>
                    {/* Date Picker pour la date de début */}
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
                    {/* Date Picker pour la date de fin */}
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
                    {/* Input pour le prix */}
                    <div>
                        <label>Prix:</label>
                        <input
                            type="text"
                            value={prix}
                            onChange={(e) => setPrix(e.target.value)}
                            placeholder={prix}
                        />
                    </div>
                    {/* Input pour autres informations */}
                    <div>
                        <label>Autre:</label>
                        <input
                            type="text"
                            value={autre}
                            onChange={(e) => setAutre(e.target.value)}
                            placeholder={autre}
                        />
                    </div>
                    {/* Input pour l'email du client */}
                    <div>
                        <label>Courriel Client:</label>
                        <input
                            type="text"
                            value={clientCourriel}
                            onChange={(e) => setClientCourriel(e.target.value)}
                            placeholder={clientCourriel}
                        />
                    </div>
                    {/* Input pour le numéro de chambre */}
                    <div>
                        <label>Numéro de Chambre:</label>
                        <input
                            type="text"
                            value={chambreNum}
                            onChange={(e) => setChambreNum(e.target.value)}
                            placeholder={chambreNum}
                        />
                    </div>

                    <button onClick={handleSave}>Save</button> {/* Bouton pour enregistrer la réservation */}

                    {/* Affichage du message d'erreur ou de succès */}
                    {error ?
                        <div style={{ color: 'red' }}>{error}</div> :
                        <div style={{ color: 'green' }}>{successMessage}</div>
                    }
                </div>
            </div>
        </main>
    );
}

export default AjouterReservation;
