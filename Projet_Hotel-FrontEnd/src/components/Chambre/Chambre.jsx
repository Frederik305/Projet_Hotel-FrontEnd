/* eslint-disable react/prop-types */




const Chambre = ({ chambre }) => {
    return (

        <>
            <div className="reservation-card">
                <h4>Id: {chambre.pkChaId}</h4>
                
                <h4>{chambre.chaNumero}</h4> 
                
            </div>
        </>
    );
};
export default Chambre;