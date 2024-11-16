
/* eslint-disable react/prop-types */
import { Outlet, Link } from "react-router-dom";



const Layout = () => {
    return (

        <>
            <nav>
                <ul>

                    <li>
                        <Link to="/afficheReservations">Affiche Reservations</Link>
                    </li>
                    <li>
                        <Link to="/client">Client</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />

        </>
    );
};
export default Layout;