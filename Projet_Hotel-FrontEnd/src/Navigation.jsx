/* eslint-disable react/prop-types */
import { Outlet, Link } from "react-router-dom";
import LogoutButton from "./logout";

const Navigation = () => {
    return (
        <>
            {/* Barre de navigation principale */}
            <nav>
                {/* Liens vers diff�rentes pages de l'application */}
                <Link to="/afficheReservations">Affiche Reservations</Link>                     {/* Afficher toutes les r�servations */}
                <Link to="/rechercheReservation">Rechercher une reservation</Link>              {/* Recherche de r�servations */}
                <Link to="/rechercheModifierReservation">Modifier une reservation</Link>        {/* Modifier une r�servation existante */}
                <Link to="/ajouterReservation">Ajouter une reservation</Link>                   {/* Ajouter une nouvelle r�servation */}
                <LogoutButton />                                                                {/* Composant pour la d�connexion */}
            </nav>

            {/* Composant `Outlet` utilis� pour rendre les composants enfants de cette route */}
            <Outlet />
        </>
    );
};

export default Navigation;
