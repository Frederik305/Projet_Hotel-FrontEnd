/* eslint-disable react/prop-types */
import TypeChambre from "../TypeChambre/TypeChambre";
import { useState, useEffect } from 'react';
import ReservationsRequests from "../ReservationsRequests";

const Chambre = ({ chambre }) => {
    // Utilisation du hook personnalisé
    const { typeChambre, fetchTypeChambre } = ReservationsRequests({}, chambre);

    // États pour gérer la visibilité et le chargement des données de type de chambre
    const [typeChambreVisible, setTypeChambreVisible] = useState(false);
    const [loadingTypeChambre, setLoadingTypeChambre] = useState(false);

    // Fonction pour gérer la visibilité et déclencher le fetch
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

    useEffect(() => {
        toggleTypeChambreVisibility();
    }, []);

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