/* eslint-disable react/prop-types */
import photoChambreDouble from '../../logo/chambreDouble.jpeg';
import photoChambreKing from '../../logo/chambreKing.jpeg';
import photoChambreSimple from '../../logo/chambreSimple.jpg';
import photoChambreQueen from '../../logo/chambreQueen.jpg';

const TypeChambre = ({ TypeChambre }) => {
    let selectedPhoto

    // Condition pour choisir la photo
    if (TypeChambre.typNomType === 'Double') {
        selectedPhoto = photoChambreDouble;
    } else if (TypeChambre.typNomType === 'King') {
        selectedPhoto = photoChambreKing;
    } else if (TypeChambre.typNomType === 'Simple') {
        selectedPhoto = photoChambreSimple;
    } else {
        selectedPhoto = photoChambreQueen; // Par défaut
    }
    return (
        <>
            {/* Affichage de l'image sélectionnée */}
            <img src={selectedPhoto} alt="image de la chambre" className="imageChambre" />
            <p>Type de chambre: {TypeChambre.typNomType} </p> {/* Affichage du type de chambre */}
            <p>Description: {TypeChambre.typDescription}</p> {/* Affichage de la description de la chambre */}
        </>
    );
};

export default TypeChambre;