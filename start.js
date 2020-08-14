const fs = require('fs');

const startIds = JSON.parse(fs.readFileSync('data/starts/startIds.json', 'utf8'));

const totalStarts = startIds.map(_id => {
    return {
        _id,
        tour: null,
        participants: [],
        date: null,
        ended: false,
    }
})

fs.writeFileSync('data/starts/starts.json', JSON.stringify(totalStarts))

module.exports = {
    totalStarts
}