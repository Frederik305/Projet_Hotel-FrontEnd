/* eslint-disable react/prop-types */
// Importation des dépendances nécessaires
import TypeChambre from "../TypeChambre/TypeChambre";
import { useState, useEffect } from 'react';
import ReservationsRequests from "../ReservationsRequests";

const Chambre = ({ chambre }) => {
    // Gestion des données liées au type de chambre
    const { typeChambre, fetchTypeChambre } = ReservationsRequests({}, chambre);

    // États pour la visibilité et le statut de chargement
    const [typeChambreVisible, setTypeChambreVisible] = useState(false);
    const [loadingTypeChambre, setLoadingTypeChambre] = useState(false);

    // Alterne la visibilité et déclenche le chargement des données si nécessaire
    const toggleTypeChambreVisibility = async () => {
        if (!typeChambre) {
            if (!loadingTypeChambre) {
                setLoadingTypeChambre(true);
                await fetchTypeChambre();
                setLoadingTypeChambre(false);
                setTypeChambreVisible(true);
            }
        } else {
            setTypeChambreVisible((prev) => !prev);
        }
    };

    // Charge automatiquement les données au montage du composant
    useEffect(() => {
        toggleTypeChambreVisibility();
    }, []);

    // Rendu du composant avec conditionnalités sur le chargement et la visibilité
    return (
        <div className="card">
            <h4>Numero de chambre: {chambre.chaNumero}</h4>
            {loadingTypeChambre ? '' :
                typeChambreVisible && <TypeChambre TypeChambre={typeChambre} />
            }
        </div>
    );
};

export default Chambre;
