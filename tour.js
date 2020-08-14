const fs = require('fs');
const { createArr } = require('./tools/ds');

const { totalUsers } = require('./user');

const maxGroupSize = [8, 10, 15, 16, 18, 20, 24, 25];
const guideLength = [1, 2, 2, 3, 3, 3, 4];
const difficulty = ['easy', 'easy', 'easy', 'medium', 'medium', 'hard'];
const locations = JSON.parse(fs.readFileSync('data/locations/locations.json', 'utf8'));
const days = [1, 1, 2, 2, 2, 3, 3, 4];

const tourIds = JSON.parse(fs.readFileSync('data/tours/tourIds.json', 'utf8'));
const totalTours = tourIds.map((_id, index) => {
    return {
        _id,
        author: totalUsers.find(u => u.tours.includes(_id))._id,
        maxGroupSize: maxGroupSize[Math.floor(Math.random() * 8)],
        difficulty: difficulty[Math.floor(Math.random() * 6)],
        name: null,
        summary: null,
        description: null,
        firstMessage: null,
        imageCover: null,
        images: [],
        price: null,
        locations: locations[index].data.map(loc => ({
            day: days[Math.floor(Math.random() * days.length)],
            address: loc.place_name,
            coordinates: loc.coordinates,
        })),
        draft: false,
        guides: createArr(guideLength[Math.floor(Math.random() * guideLength.length)]).map(_ => totalUsers[Math.floor(Math.random() * totalUsers.length)]._id),
    }
})

fs.writeFileSync('data/tours/tours.json', JSON.stringify(totalTours))

module.exports = {
    totalTours
}