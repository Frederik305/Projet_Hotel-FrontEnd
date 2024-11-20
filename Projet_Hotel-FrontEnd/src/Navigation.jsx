
/* eslint-disable react/prop-types */
import { Outlet, Link } from "react-router-dom";

import LogoutButton from "./logout";


const Navigation = () => {
    return (

        <>
            <nav>
                <div className="link-nav">
                        <Link to="/afficheReservations">Affiche Reservations</Link>
                    
                        <Link to="/rechercheReservation">Rechercher une reservation</Link>
                </div>
                        

                    <LogoutButton />
            </nav>


            <Outlet />

        </>
    );
};
export default Navigation;