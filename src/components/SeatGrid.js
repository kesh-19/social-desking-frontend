import React from 'react';
import db_desk_normal from '../images/db_office.png';
import db_desk_red from '../images/db_desk_red.png';
import db_desk_green from '../images/db_desk_green.png';
import db_desk_muted from '../images/db_desk_muted.png'
import { Box } from '@material-ui/core';


function SeatGrid({ seatList, onDeskClick, selected, bookedSeats }) {

    const checkIfBooked = (seat) => {        
        const { seatId } = seat;
        const filterSeats = bookedSeats.filter(item => item.seatId === seatId);
        return !!(filterSeats.length >= 1)
    }

    if (seatList.length < 1) {
        return (<Box>
            <p>No seats available</p>
        </Box>);
    }

    return (
        <div style={{
            marginTop: "2em",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
            maxHeight: '17rem',
            overflowY: 'scroll',
            scrollbarWidth: 'thin'
        }}>

            {
                seatList.map((item, idx) => {
                    if (checkIfBooked(item)) {
                        return (
                            <div
                                key={item.seatId}
                                onClick={() => onDeskClick(idx)}
                                style={{
                                    margin: "0.5em"
                                }}>
                                <img src={db_desk_red} alt="desk" style={{ height: 32, width: 32 }} />
                                <p style={{ margin: 0, padding: 0 }}>{idx + 1}</p>
                            </div>
                        );
                    } else if (idx + 1 === selected) {
                        return (
                            <div
                                key={item.seatId}
                                onClick={() => onDeskClick(idx)}
                                style={{
                                    cursor: "pointer",
                                    margin: "0.5em"
                                }}>
                                <img src={db_desk_green} alt="desk" style={{ height: 32, width: 32 }} />
                                <p style={{ margin: 0, padding: 0 }}>{idx + 1}</p>
                            </div>
                        );
                    } else if (item.blocked) {
                        return (
                            <div
                                key={item.seatId}
                                onClick={() => onDeskClick(idx)}
                                style={{
                                    margin: "0.5em"
                                }}>
                                <img src={db_desk_muted} alt="desk" style={{ height: 32, width: 32 }} />
                                <p style={{ margin: 0, padding: 0 }}>{idx + 1}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={item.seatId}
                                onClick={() => onDeskClick(idx)}
                                style={{
                                    cursor: "pointer",
                                    margin: "0.5em"
                                }}>
                                <img src={db_desk_normal} alt="desk" style={{ height: 32, width: 32 }} />
                                <p style={{ margin: 0, padding: 0 }}>{idx + 1}</p>
                            </div>
                        );
                    }

                })
            }
        </div>
    );
}

export default SeatGrid;