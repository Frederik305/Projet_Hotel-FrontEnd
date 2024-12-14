/* eslint-disable react/prop-types */
import { Outlet, Link } from "react-router-dom";
import LogoutButton from "./logout";

const Navigation = () => {
    return (
        <>
            {/* Barre de navigation principale */}
            <nav>
                {/* Liens vers différentes pages de l'application */}
                <Link to="/afficheReservations">Affiche Reservations</Link>                     {/* Afficher toutes les réservations */}
                <Link to="/rechercheReservation">Rechercher une reservation</Link>              {/* Recherche de réservations */}
                <Link to="/rechercheModifierReservation">Modifier une reservation</Link>        {/* Modifier une réservation existante */}
                <Link to="/ajouterReservation">Ajouter une reservation</Link>                   {/* Ajouter une nouvelle réservation */}
                <LogoutButton />                                                                {/* Composant pour la déconnexion */}
            </nav>

            {/* Composant `Outlet` utilisé pour rendre les composants enfants de cette route */}
            <Outlet />
        </>
    );
};

export default Navigation;
