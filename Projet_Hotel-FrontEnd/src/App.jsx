import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signin from './components/Signin/Signin';
import Navigation from "./Navigation";
import AfficheReservation from './components/Reservation/AfficheReservations';
import RechercheReservation from './components/Reservation/RechercheReservation';
import RechercheModifierReservation from './components/EditReservation/RechercheModifierReservation';
import AjouterReservation from './components/Reservation/AjouterReservation';
import Home from "./Home";

// Fonction pour vérifier si l'utilisateur est authentifié via le token (localStorage)
const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    return !!token;  // Retourne true si le token existe
};

function App() {
    return (
        <Router>
            <Routes>
                {/* La route de redirection initiale */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Les routes accessibles sans être authentifié */}
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />

                {/* Routes qui nécessitent un accès authentifié, incluses sous <Navigation> */}
                <Route path="/" element={isAuthenticated() ? <Navigation /> : <Navigate to="/login" replace />}>
                    {/* Routes protégées, uniquement accessibles si authentifié */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/afficheReservations" element={<AfficheReservation />} />
                    <Route path="/rechercheReservation" element={<RechercheReservation />} />
                    <Route path="/rechercheModifierReservation" element={<RechercheModifierReservation />} />
                    <Route path="/ajouterReservation" element={<AjouterReservation />} />
                </Route>

                {/* Redirection vers la page login si aucun autre chemin n'est trouvé */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
