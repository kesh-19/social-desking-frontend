import React from 'react';
import db_desk_normal from '../images/db_office.png';
import db_desk_red from '../images/db_desk_red.png';
import db_desk_green from '../images/db_desk_green.png';
import db_desk_muted from '../images/db_desk_muted.png'


function SeatGrid() {

    const arr = [1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6]

    return (
        <div style={{
            marginTop: "2em",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap"
        }}>

            {
                arr.map((item, idx) => {
                    if (item < 3) {
                        return (
                            <div style={{
                                margin: "0.5em"
                            }}>
                                <img src={db_desk_red} alt="desk" style={{ height: 32, width: 32 }} />   
                                <p style={{margin: 0, padding: 0}}>{idx + 1}</p>
                            </div>
                        );
                    } else if (item === 3) {
                        return (
                            <div style={{
                                margin: "0.5em"
                            }}>
                                <img src={db_desk_green} alt="desk" style={{ height: 32, width: 32 }} />   
                                <p style={{margin: 0, padding: 0}}>{idx + 1}</p>
                            </div>
                        );
                    } else if (item === 4){
                        return (
                            <div style={{
                                margin: "0.5em"
                            }}>
                                <img src={db_desk_muted} alt="desk" style={{ height: 32, width: 32 }} />   
                                <p style={{margin: 0, padding: 0}}>{idx + 1}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div style={{
                                margin: "0.5em"
                            }}>
                                <img src={db_desk_normal} alt="desk" style={{ height: 32, width: 32 }} />   
                                <p style={{margin: 0, padding: 0}}>{idx + 1}</p>
                            </div>
                        );
                    }

                })
            }
        </div>
    );
}

export default SeatGrid;