export const getFloorProgress = (seats) => {
    return new Promise((resolve, reject) => {
        let result = {}

        seats.forEach(seat => {
            
            if (!seat.blocked) {
                if (seat.floorNo in result) {
                
                    result[seat.floorNo].total += 1
                    if (seat.booked) result[seat.floorNo].booked += 1
    
                } else {
                    result[seat.floorNo] = {
                        booked: seat['booked'] ? 1 : 0,
                        total: 1
                    }
                }
            }

        });
        Object.keys(result).forEach(item => {
            result[item] = Math.round((result[item].booked/result[item].total)*100)
        })
        resolve(result)
        reject('Error while getFloorProgress')
    })
}
