const GenerateIds = require('./idGenerator');
const fs = require('fs');
const { awsOptions } = require('./config')
const Photo = require('./photo');
const { userGen } = require('./user');


//////////// Generate users for your need \\\\\\\\\\\\\\
// User Photos
const manPhotos = new Photo(awsOptions, 'entours', 'data/users/m', 'data/users/manIds.json');
const womanPhotos = new Photo(awsOptions, 'entours', 'data/users/g', 'data/users/womanIds.json');

// Raw users
let parsedMix = JSON.parse(fs.readFileSync('data/users/mixUsers.json', 'utf8'));

// Ids
let menIds = JSON.parse(fs.readFileSync('data/users/manIds.json', 'utf8'));
let womanIds = JSON.parse(fs.readFileSync('data/users/WomanIds.json', 'utf8'));

// Users by gender
let men = userGen(parsedMix, menIds, 'Male', manPhotos);
let women = userGen(parsedMix, womanIds, 'Female', womanPhotos)

// Total tours
const tours = JSON.parse(fs.readFileSync('data/tours/tourIds.json', 'utf8'))
let userTours = [...tours];

// Users ready to deploy
const totalUsers = [...men, ...women]
    .sort((a, b) => a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1)
    .map((u, i) => {
        switch (true) {
            case i < 10:
                return {...u, tours: userTours.splice(0, 4)};
            case i < 20:
                return {...u, tours: userTours.splice(0, 3)};
            case i < 40:
                return {...u, tours: userTours.splice(0, 2)};
            case i < 130:
                return {...u, tours: userTours.splice(0, 1)};
            default:
                return u
        }
    })
// fs.writeFileSync('data/users/users.json', JSON.stringify(totalUsers))
///////////////////////////

let users = JSON.parse(fs.readFileSync('data/users/users.json', 'utf8'));

console.log(users)

//\\//\\ GENERATE IDS FOR YOUR NEED \\//\\//
// const genIds = new GenerateIds(undefined, 6);
// fs.writeFileSync('reviewIds.json', JSON.stringify(genIds.generateIds(2000)))