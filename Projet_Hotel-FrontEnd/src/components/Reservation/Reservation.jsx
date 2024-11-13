/* eslint-disable react/prop-types */

const Reservation = ({ reservation }) => {
    return (
        <>
            <h4>{reservation.du} au {reservation.au}</h4>
            <p>{reservation.prix} par jour</p>
            <div>
                <button className="button-info"
                    onClick={() => this.toggleInformationVisibility(this.refClient)}>
                </button>

                <button className="button-info"
                    onClick={() => this.toggleInformationVisibility(this.refChambre)}>
                </button>
            </div>
        </>
    );
};

export default Reservation;