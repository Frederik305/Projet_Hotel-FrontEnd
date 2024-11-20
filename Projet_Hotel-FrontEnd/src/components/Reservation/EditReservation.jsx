import { useState } from 'react';
/* eslint-disable react/prop-types */

const Reservation = ({ reservation }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [du, setDu] = useState('');
    const [au, setAu] = useState('');
    const [prix, setPrix] = useState('');
    const [mobile, setMobile] = useState('');

    const handleModifierClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <>
            <h4>{isEditing ? "Edit Reservation" : `${reservation.du} au ${reservation.au}`}</h4>
            <p>{reservation.prix} par jour</p>
            <div>
                <button className="button-info"
                    onClick={() => this.toggleInformationVisibility(this.refClient)}>
                </button>

                <button className="button-info"
                    onClick={() => this.toggleInformationVisibility(this.refChambre)}>
                </button>
            </div>


            {isEditing ? (
                <>
                    <div>
                        <label>Du:</label>
                        <input
                            type="text"
                            value={du}
                            onChange={(e) => setDu(e.target.value)}
                            placeholder={reservation.du}
                        />
                    </div>
                    <div>
                        <label>Au:</label>
                        <input
                            type="text"
                            value={au}
                            onChange={(e) => setAu(e.target.value)}
                            placeholder={reservation.au}
                        />
                    </div>
                    <div>
                        <label>Prix:</label>
                        <input
                            type="text"
                            value={prix}
                            onChange={(e) => setPrix(e.target.value)}
                            placeholder={reservation.prix}
                        />
                    </div>
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <p>du {reservation.du} au {reservation.au}</p>
                    <p>{reservation.prix}</p>
                </>
            )}

            <button onClick={handleModifierClick}>{isEditing ? 'Cancel' : 'Modifier'}</button>
            <button>Supprimer</button>
        </>
    );
};

export default Reservation;