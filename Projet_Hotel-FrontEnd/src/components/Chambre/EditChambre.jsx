/* eslint-disable react/prop-types */
// Importation des dépendances nécessaires
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditChambre = ({ chambre }) => {
    const navigate = useNavigate();

    // Gestion des erreurs et des états d'édition
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // États pour les champs éditables
    const [numero, setNumero] = useState(chambre.chaNumero);
    const [autres, setAutres] = useState(chambre.chaAutreInfo);

    // Fonction pour modifier les informations de la chambre
    const modifierChambre = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login'); // Redirection vers la page de connexion si le token n'est pas disponible
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
                const errorData = await response.json(); // Gestion des erreurs serveur
                throw new Error(errorData.message);
            }

            // Met à jour les informations affichées
            setAutres(response.chaAutreInfo);
        } catch (err) {
            setError(err.message); // Affiche un message d'erreur
        }
    };

    // Gestion du bouton de modification
    const handleModifierClick = () => {
        setIsEditing(!isEditing); // Alterne entre le mode lecture et le mode édition
    };

    // Enregistre les modifications et désactive le mode édition
    const handleSave = () => {
        modifierChambre();
        setIsEditing(false);
    };

    // Affiche un message d'erreur si nécessaire
    if (error) {
        return <div><h3>{error}</h3></div>;
    }

    // Affichage du composant
    return (
        <>
            <div className="card">
                {isEditing ? (
                    <>
                        <h4>Modifier la chambre : {chambre.chaNumero}</h4>
                        <div>
                            <label>Numéro de Chambre :</label>
                            <input
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder={numero}
                            />
                        </div>
                        <div>
                            <label>Autres Infos :</label>
                            <input
                                type="text"
                                value={autres}
                                onChange={(e) => setAutres(e.target.value)}
                                placeholder={autres}
                            />
                        </div>
                        <button onClick={handleSave}>Sauvegarder les modifications</button>
                    </>
                ) : (
                    <>
                        <h4>Numéro de la chambre : {chambre.chaNumero}</h4>
                        <p>Informations sur la chambre : {chambre.chaAutreInfo}</p>
                    </>
                )}
                <button onClick={handleModifierClick}>
                    {isEditing ? 'Annuler' : 'Modifier la chambre'}
                </button>
            </div>
        </>
    );
};

export default EditChambre;
