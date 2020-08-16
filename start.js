const fs = require('fs');

const startIds = JSON.parse(fs.readFileSync('data/starts/starts.json', 'utf8'));

const totalStarts = startIds.map(({_id, tour, participants, date }) => {
    return {
        _id,
        tour,
        participants,
        date,
        ended: false,
    }
})

fs.writeFileSync('data/starts/starts.json', JSON.stringify(totalStarts))

module.exports = {
    totalStarts
}