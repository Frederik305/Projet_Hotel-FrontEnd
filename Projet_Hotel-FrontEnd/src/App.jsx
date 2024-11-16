import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Navigation from "./Navigation"
import AfficheReservation from './components/Reservation/AfficheReservations';
import Home from "./Home"

function App() {
    return (
        <Router>
            <Routes>
                {/* Route par d�faut qui redirige vers la page de connexion */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<Navigation />} >
                    <Route path="/home" element={<Home />}/>
                    <Route path="/afficheReservations" element={<AfficheReservation />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
