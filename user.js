const fs = require('fs');
const { awsOptions } = require('./config')
const Photo = require('./photo');

//////////// Generate users for your need \\\\\\\\\\\\\\
// User Photos
const manPhotos = new Photo(awsOptions, 'entours', 'data/users/m', 'data/users/manIds.json');
const womanPhotos = new Photo(awsOptions, 'entours', 'data/users/g', 'data/users/womanIds.json');

// Raw users
let parsedMix = JSON.parse(fs.readFileSync('data/users/mixUsers.json', 'utf8'));

// Ids
let menIds = JSON.parse(fs.readFileSync('data/users/manIds.json', 'utf8'));
let womanIds = JSON.parse(fs.readFileSync('data/users/WomanIds.json', 'utf8'));

// Total tours
const tours = JSON.parse(fs.readFileSync('data/tours/tourIds.json', 'utf8'))
let userTours = [...tours];

// Total tours
const reviews = JSON.parse(fs.readFileSync('data/reviews/reviewIds.json', 'utf8'))
let userReviews = [...reviews];

// Generate users
function userGen(parsedMix, ids, gender = 'Male', photos) {
    return parsedMix
        .filter(u => u.gender === gender)
        .slice(0, 232)
        .map((u, index) => ({
            _id: ids[index],
            name: u.first_name + ' ' + u.last_name,
            gender: u.gender,
            email: u.email,
            photo: `users/${ids[index]}/avatar/${photos.readDir(true)[index]}`,
            reviews: [],
            tours: [],
            saved: [],
            role: 'user',
            active: true,
            speaks: [ 'English' ],
            password: '$2b$12$3WeOSwigC2ADLbw.boW62eD52Xr2JZRNk3OyHtp1v6kObsFgHwFNa'.slice(0, ids[index].length) + ids[index]
        }))
}

// Users by gender
let men = userGen(parsedMix, menIds, 'Male', manPhotos);
let women = userGen(parsedMix, womanIds, 'Female', womanPhotos)

// Users ready to deploy
const totalUsers = [...men, ...women]
    .sort((a, b) => a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1)
    .map((u, i) => {
        switch (true) {
            case i < 10:
                return {...u, tours: userTours.splice(0, 7)};
            case i < 20:
                return {...u, tours: userTours.splice(0, 5)};
            case i < 40:
                return {...u, tours: userTours.splice(0, 2)};
            case i < 80:
                return {...u, tours: userTours.splice(0, 1)};
            default:
                return u
        }
    })
    .map((u, i) => {
        switch (true) {
            case i >= 390:
                return {...u, reviews: userReviews.splice(0, 11)};
            case i >= 350:
                return {...u, reviews: userReviews.splice(0, 9)};
            case i >= 320:
                return {...u, reviews: userReviews.splice(0, 8)};
            case i >= 280:
                return {...u, reviews: userReviews.splice(0, 7)};
            case i >= 250:
                return {...u, reviews: userReviews.splice(0, 6)};
            case i >= 220:
                return {...u, reviews: userReviews.splice(0, 5)};
            case i >= 190:
                return {...u, reviews: userReviews.splice(0, 4)};
            case i >= 160:
                return {...u, reviews: userReviews.splice(0, 3)};
            case i >= 130:
                return {...u, reviews: userReviews.splice(0, 2)};
            default:
                return u
        }
    })

fs.writeFileSync('data/users/users.json', JSON.stringify(totalUsers))

module.exports = {
    userGen,
    totalUsers
}