const fs = require('fs');
const { createArr } = require('./tools/ds');

const { totalUsers } = require('./user');

const maxGroupSize = [8, 10, 15, 16, 18, 20, 24, 25];
const prices = [599, 649, 699, 749, 799, 849, 899, 949, 999, 999, 999, 999, 999, 1049, 1099, 1149, 1199, 1249, 1299, 1349, 1399, 1449, 1499, 1549, 1599, 1649, 1699, 1749, 1799, 1849, 1899, 1949, 1999, 1999, 1999]
const guideLength = [1, 2, 2, 3, 3, 3, 4];
const difficulty = ['easy', 'easy', 'easy', 'easy', 'easy', 'easy', 'easy', 'medium', 'medium', 'hard'];
const locations = JSON.parse(fs.readFileSync('data/locations/locations.json', 'utf8'));
const names = JSON.parse(fs.readFileSync('data/tours/names.json', 'utf8'));
const days = [1, 1, 2, 2, 2, 3, 3, 4];
const images = JSON.parse(fs.readFileSync('data/tours/images.json', 'utf8'));

const tourIds = JSON.parse(fs.readFileSync('data/tours/tourIds.json', 'utf8'));
const totalTours = tourIds.map((_id, index) => {
    return {
        _id,
        author: totalUsers.find(u => u.tours.includes(_id))._id,
        maxGroupSize: maxGroupSize[Math.floor(Math.random() * 8)],
        difficulty: difficulty[Math.floor(Math.random() * 6)],
        name: names[index].name,
        summary: names[index].summary,
        description: names[index].description,
        firstMessage: 'Hello 👋️! I am the author of this tour. Here we\'ve done our best for you to enjoy your time with us, and you to be happy with your choice. Hope you like it and after the tour ends, please, don\'t forget to write a positive review ❤️ ',
        imageCover: images.find(image => image.tourId === _id).imageCover,
        images: images.find(image => image.tourId === _id).images,
        price: prices[Math.floor((Math.random() * prices.length))],
        locations: locations[index].data.map(loc => ({
            day: days[Math.floor(Math.random() * days.length)],
            address: loc.place_name,
            coordinates: loc.coordinates,
            description: loc.place_name.split(',')[0]
        })),
        draft: false,
        guides: createArr(guideLength[Math.floor(Math.random() * guideLength.length)]).map(_ => totalUsers[Math.floor(Math.random() * totalUsers.length)]._id),
    }
})


fs.writeFileSync('data/tours/tours.json', JSON.stringify(totalTours))

module.exports = {
    totalTours
}



const userIds = totalUsers.map(u => u._id)

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// _________________
// const startIds = JSON.parse(fs.readFileSync('data/starts/starts2.json', 'utf8'));
// let arr = [];
// const startA = startIds.forEach(s => {
//     arr = [...arr, ...s.startId]
// })
// fs.writeFileSync('data/starts/starts3.json', JSON.stringify(arr))
// _________________

// const startIds = JSON.parse(fs.readFileSync('data/starts/startsWithTours.json', 'utf8'))
// // console.log(startIds)
// const tourStart = () => {
//     const sss = startIds.map(({tourId, startId}, mainIndex) => {
//         let shuffled = shuffle([...userIds.slice(81, userIds.length)]);
//         let participants = [...shuffled];
//         return {
//             tourId,
//             startId: startId.map(({_id, tour, date, ended }) => {
//                 switch (true) {
//                     case date >= 1618392164664 && date <= 1620984164665:
//                         return {
//                             _id,
//                             tour,
//                             date,
//                             ended,
//                             participants: participants.splice(0, Math.floor(Math.random() * 4) + 7),
//                         }
//                     case date > 1620984164665 && date <= 1623576164665:
//                         return {
//                             _id,
//                             tour,
//                             date,
//                             ended,
//                             participants: participants.splice(0, Math.floor(Math.random() * 3) + 6),
//                         }
//                     case date > 1623576164665 && date <= 1626168164665:
//                         return {
//                             _id,
//                             tour,
//                             date,
//                             ended,
//                             participants: participants.splice(0, Math.floor(Math.random() * 2) + 5),
//                         }
//                     case date > 1626168164665 && date <= 1628760164665:
//                         return {
//                             _id,
//                             tour,
//                             date,
//                             ended,
//                             participants: participants.splice(0, Math.floor(Math.random() * 2) + 3),
//                         }
//                     case date > 1628760164665 && date <= 1633944164665:
//                         return {
//                             _id,
//                             tour,
//                             date,
//                             ended,
//                             participants: participants.splice(0, Math.floor(Math.random() * 2) + 2),
//                         }
//                     case date > 1633944164665 && date <= 1639128164665:
//                         return {
//                             _id,
//                             tour,
//                             date,
//                             ended,
//                             participants: participants.splice(0, Math.floor(Math.random()) + 1),
//                         }
//                     default:
//                         return {
//                             _id,
//                             tour,
//                             date,
//                             ended,
//                             participants: [],
//                         }
//                 }
//             })
//         }
//     })
//     fs.writeFileSync('data/starts/starts2.json', JSON.stringify(sss))
// }

// tourStart()
