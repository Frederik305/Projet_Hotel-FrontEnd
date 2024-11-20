import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signin from './components/Signin/Signin';
import Navigation from "./Navigation"
import AfficheReservation from './components/Reservation/AfficheReservations';
import RechercheReservation from './components/Reservation/RechercheReservation';
import Home from "./Home"

function App() {
    return (
        <Router>
            <Routes>
                {/* Route par d�faut qui redirige vers la page de connexion */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/" element={<Navigation />} >
                    <Route path="/home" element={<Home />}/>
                    <Route path="/afficheReservations" element={<AfficheReservation />} />
                    <Route path="/rechercheReservation" element={<RechercheReservation />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
