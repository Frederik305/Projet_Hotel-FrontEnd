import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
const EditClient = ({ client }) => {
    const navigate = useNavigate();

    // États pour gérer les erreurs, la visibilité des informations et le mode d'édition
    const [error, setError] = useState('');
    const [IsShowing, setIsShowing] = useState(true);  // Gère l'affichage des informations détaillées
    const [isEditing, setIsEditing] = useState(false); // Gère l'état d'édition du client

    // États pour les champs du client qui peuvent être modifiés
    const [prenom, setPrenom] = useState(client.cliPrenom);
    const [nom, setNom] = useState(client.cliNom);
    const [courriel, setCourriel] = useState(client.cliCourriel);
    const [mobile, setMobile] = useState(client.cliTelephoneMobile);
    const [addresse, setAddresse] = useState(client.cliAddresseResidence);
    const [password, setPassword] = useState(client.cliMotDePasse);

    // Fonction asynchrone pour modifier les informations du client via une requête HTTP
    const modifierClient = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login'); // Redirige l'utilisateur vers la page de connexion si le token est absent
            return;
        }
        try {
            // Requête POST pour mettre à jour les informations du client
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
                const errorData = await response.text(); // Récupère l'erreur si la réponse n'est pas ok
                throw new Error(errorData.message || 'Action impossible');
            }
        } catch (err) {
            setError(err.message); // Gère et affiche les erreurs éventuelles
        }
    };

    // Fonction pour gérer l'alternance entre mode lecture et édition
    const handleModifierClick = () => {
        setIsEditing(!isEditing);  // Basculer entre les modes
    };

    // Fonction pour gérer la sauvegarde des modifications
    const handleSave = () => {
        modifierClient(); // Appel à la fonction pour enregistrer les données
        setIsEditing(false); // Sort du mode édition après la sauvegarde
    };

    // Fonction pour afficher/masquer les informations supplémentaires du client
    const handleShowClick = () => {
        setIsShowing(!IsShowing); // Alterne l'affichage des infos détaillées
    };

    // Gestion des erreurs : Affichage d'un message d'erreur
    if (error) {
        return (
            <div><h3>{error}</h3></div>
        )
    }

    // Affichage du formulaire d'édition ou des informations en lecture seule
    return (
        <>
            <div className="card">
                {isEditing ? (
                    <>
                        <h4>Modifier le client: {client.cliPrenom} {client.cliNom}</h4>
                        {/* Formulaire d'édition des données client */}
                        <div>
                            <label>Prénom:</label>
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
                            <label>Adresse:</label>
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
                        <button onClick={handleSave}>Sauvegarder</button> {/* Sauvegarde des modifications */}
                    </>
                ) : (
                    <div>
                        <h4>{client.cliPrenom} {client.cliNom}</h4>
                        {/* Bouton pour afficher ou masquer les informations supplémentaires */}
                        <button onClick={handleShowClick}>{IsShowing ? "Plus d'info →" : "Plus d'info ↓"}</button>
                        {/* Affichage conditionnel des détails du client */}
                        <p>{IsShowing ? '' : `Adresse: ${client.cliAddresseResidence}`}</p>
                        <p>{IsShowing ? '' : `Courriel: ${client.cliCourriel}`}</p>
                        <p>{IsShowing ? '' : `Téléphone: ${client.cliTelephoneMobile}`}</p>
                    </div>
                )}

                {/* Bouton pour basculer en mode édition */}
                <button onClick={handleModifierClick}>{isEditing ? 'Annuler' : 'Modifier le client'}</button>
            </div>
        </>
    );
};

export default EditClient;
