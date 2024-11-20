
/* eslint-disable react/prop-types */
import { Outlet, Link } from "react-router-dom";



const Navigation = () => {
    return (

        <>
            <nav>
                <ul>

                    <li>
                        <Link to="/afficheReservations">Affiche Reservations</Link>
                    </li>
                    <li>
                        <Link to="/rechercheReservation">Rechercher une reservation</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />

        </>
    );
};
export default Navigation;