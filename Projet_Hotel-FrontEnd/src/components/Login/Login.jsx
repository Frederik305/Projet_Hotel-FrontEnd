import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5292/Login/login', { // Remplacez par l'URL de votre API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    logCourriel: email,
                    logMotDePasse: password,
                }),
            });
            if (!response.ok) {
                // Si la réponse n'est pas ok (code 4xx, 5xx), traiter l'erreur
                const errorData = await response.text(); // On suppose que le backend renvoie un JSON avec un message d'erreur
                throw new Error(errorData.message || 'Connexion impossible');
            }
            

            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken); // Stockage du token dans localStorage
           
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main>
            <div className="login-container">
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Connexion
                    </button>
                </form>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Link to="/signin">Pas de compte? Inscrivez-vous!</Link>
            </div>
        </main>
    );
};

export default Login;
