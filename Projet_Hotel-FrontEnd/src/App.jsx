import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signin from './components/Signin/Signin';
import Navigation from "./Navigation";
import AfficheReservation from './components/Reservation/AfficheReservations';
import RechercheReservation from './components/Reservation/RechercheReservation';
import RechercheModifierReservation from './components/EditReservation/RechercheModifierReservation';
import AjouterReservation from './components/Reservation/AjouterReservation';
import Home from "./Home";

// Fonction pour v�rifier si l'utilisateur est authentifi� via le token (localStorage)
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

                {/* Les routes accessibles sans �tre authentifi� */}
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />

                {/* Routes qui n�cessitent un acc�s authentifi�, incluses sous <Navigation> */}
                <Route path="/" element={isAuthenticated() ? <Navigation /> : <Navigate to="/login" replace />}>
                    {/* Routes prot�g�es, uniquement accessibles si authentifi� */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/afficheReservations" element={<AfficheReservation />} />
                    <Route path="/rechercheReservation" element={<RechercheReservation />} />
                    <Route path="/rechercheModifierReservation" element={<RechercheModifierReservation />} />
                    <Route path="/ajouterReservation" element={<AjouterReservation />} />
                </Route>

                {/* Redirection vers la page login si aucun autre chemin n'est trouv� */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
