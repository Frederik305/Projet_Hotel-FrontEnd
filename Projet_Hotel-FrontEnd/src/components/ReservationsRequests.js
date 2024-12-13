﻿// useReservation.js (Custom Hook)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useReservation = (Reservation, Chambre) => {
    const [error, setError] = useState('');
    const [chambre, setChambre] = useState('');
    const [client, setClient] = useState('');
    const [typeChambre, setTypeChambre] = useState('');
    const navigate = useNavigate();

    const fetchChambre = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/GetChambreById?PkChaId=${Reservation.fkChaId}`;
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
            setChambre(data);
        } catch (err) {
            setError(err.message);
            navigate('/login');
        }
    };

    const fetchClient = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/Client/GetClientById?PkCliId=${Reservation.fkCliId}`;
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
            setClient(data);
        } catch (err) {
            setError(err.message);
            navigate('/login');
        }
    };

    const fetchTypeChambre = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const url = `http://localhost:5292/GetTypeChambreById?PkTypId=${Chambre.fkTypId}`;
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
    };

    return {
        error,
        chambre,
        client,
        typeChambre,
        fetchChambre,
        fetchClient,
        fetchTypeChambre,
    };
};

export default useReservation;
