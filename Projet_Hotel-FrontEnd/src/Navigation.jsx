
/* eslint-disable react/prop-types */
import { Outlet, Link } from "react-router-dom";

import LogoutButton from "./logout";


const Navigation = () => {
    return (
        <>
            <nav>
                <Link to="/afficheReservations">Affiche Reservations</Link>
                <Link to="/rechercheReservation">Rechercher une reservation</Link>
                <Link to="/rechercheModifierReservation">Modifier une reservation</Link>
                <Link to="/ajouterReservation">Ajouter une reservation</Link>
                <LogoutButton />
            </nav>


            <Outlet />

        </>
    );
};
export default Navigation;