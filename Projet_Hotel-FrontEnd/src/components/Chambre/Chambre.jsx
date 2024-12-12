/* eslint-disable react/prop-types */
import TypeChambre from "../TypeChambre/TypeChambre";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Chambre = ({ chambre }) => {
    const [typeChambre, setTypeChambre] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    useEffect(() => {const fetchTypeChambre = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/GetTypeChambreById?PkTypId${chambre.fkTypId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erreur de r�cup�ration du type de chambre');
            }

            const data = await response.json();
            setTypeChambre(data);
           
        } catch (err) {
            setError(err.message);
            //navigate('/login');
        }
    }; fetchTypeChambre();
    }, [navigate]);

    return (

        <>
            <div className="card">              
                <h4>Numero de chambre: {chambre.chaNumero}</h4> 
                <h4>Info divers: {chambre.chaAutreInfo}</h4>
                <TypeChambre TypeChambre={typeChambre} />
            </div>
        </>
    );
};
export default Chambre;