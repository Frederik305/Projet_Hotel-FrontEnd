/* eslint-disable react/prop-types */

import Chambre from '../Chambre/Chambre';
import { useNavigate } from 'react-router-dom';
import {  useState, useRef } from "react";

const Reservation = ({ reservation }) => {
    const [clientVisible, setClientVisible] = useState(false);
    const [chambreVisible, setChambreVisible] = useState(false);

    const refClient = useRef(null);
    const refChambre = useRef(null);

    const [ setError] = useState('');
    const [chambre, setChambre] = useState('');
    const navigate = useNavigate()

    //useEffect(() => {
        const fetchChambre = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login'); // Si pas de token, rediriger vers la page de connexion
                return;
            }
            try {
                const url = `http://localhost:5292/GetChambreById?PkChaId=${reservation.fkChaId}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Ajout du token dans l'en-tête
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur de récupération des réservations');
                }

                const data = await response.json();
                setChambre(data);
            } catch (err) {
                setError(err.message);
                navigate('/login'); // En cas d'erreur, rediriger vers la page de connexion
            }
        };

        //fetchChambre();
    //}, [navigate]);
    // Fonction pour alterner la visibilité de l'information
    const toggleInformationVisibility = (type) => {
        if (type === "client") {
            setClientVisible((prev) => !prev);  // Toggle pour client
        } else if (type === "chambre") {
            fetchChambre();
            setChambreVisible((prev) => !prev);  // Toggle pour chambre
            
        }
    };

    return (
        <>
            <div className="reservation-card">
                <h4>
                    {reservation.resDateDebut} au {reservation.resDateFin}
                </h4>
                <p>{reservation.resPrixJour} par jour</p>
                <div>
                    <button
                        className="button-info"
                        onClick={() => toggleInformationVisibility("client")}
                    >
                        {reservation.fkCliId} 
                    </button>
                    {clientVisible && (
                        <p ref={refClient}>
                       
                        </p>
                    )}
                    <br />
                    <button
                        className="button-info"
                        onClick={() => toggleInformationVisibility("chambre")}
                    >
                        
                            
                           
                         Chambre
                        
                    </button>
                    {chambreVisible && (
                        <p ref={refChambre}>
                            
                                <Chambre key={chambre.pkChaId} chambre={chambre} />
                        </p>
                    )}
                </div>
            </div >
            </>
    );
};

export default Reservation;
