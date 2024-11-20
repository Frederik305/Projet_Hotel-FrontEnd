/* eslint-disable react/prop-types */




const Chambre = ({ chambre }) => {
    return (

        <>
            <div className="reservation-card">              
                <h4>Numero de chambre: {chambre.chaNumero}</h4> 
                <h4>Info divers: {chambre.chaAutreInfo}</h4>
            </div>
        </>
    );
};
export default Chambre;