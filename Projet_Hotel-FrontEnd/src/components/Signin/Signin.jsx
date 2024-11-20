import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [telephone, setTelephone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (password != password2) {
                throw new Error('Les mots de passe doivent être identiques');
            }
            const response = await fetch('http://localhost:5292/Client/addClient', { // Remplacez par l'URL de votre API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cliCourriel: email,
                    cliMotDePasse: password,
                    cliTelephoneMobile: telephone,
                    CliAddresseResidence: adresse,
                    CliPrenom: prenom,
                    CliNom: nom,
                }),
            });

            if (!response.ok) {
                throw new Error('error:' + response.statusText);
            }
            

            
            

            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Prénom:</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Adresse:</label>
                    <input
                        type="text"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Téléphone:</label>
                    <input
                        type="text"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label>Confirmer le mot de passe:</label>
                    <input
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    S&apos;inscrire
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Signin;