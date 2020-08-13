const GenerateIds = require('./idGenerator');
const fs = require('fs');
const { awsOptions } = require('./config')
const Photo = require('./photo');

const manPhotos = new Photo(awsOptions, 'entours', 'data/users/m', 'data/users/manIds.json');
const womanPhotos = new Photo(awsOptions, 'entours', 'data/users/g', 'data/users/womanIds.json');

let file = fs.readFileSync('data/users/users.json')
let parsedFile = JSON.parse(file);

let mix = fs.readFileSync('data/users/mixUsers.json')
let parsedMix = JSON.parse(mix);

let rawMenIds = fs.readFileSync('data/users/manIds.json')
let menIds = JSON.parse(rawMenIds);

let rawWomenIds = fs.readFileSync('data/users/WomanIds.json')
let womanIds = JSON.parse(rawWomenIds);

const men = parsedMix
    .filter(u => u.gender === 'Male')
    .slice(0, 232)
    .map((u, index) => ({
        _id: menIds[index],
        name: u.first_name + ' ' + u.last_name,
        gender: u.gender,
        email: u.email,
        photo: `users/${menIds[index]}/avatar/${manPhotos.readDir(true)[index]}`,
        reviews: [],
        tours: [],
        role: 'user',
        active: true,
        speaks: [ 'English' ],
        password: '$2b$12$3WeOSwigC2ADLbw.boW62eD52Xr2JZRNk3OyHtp1v6kObsFgHwFNa'.slice(0, menIds[index].length) + menIds[index]
    }))

const women = parsedMix
    .filter(u => u.gender === 'Female')
    .slice(0, 232)
    .map((u, index) => ({
        _id: menIds[index],
        name: u.first_name + ' ' + u.last_name,
        gender: u.gender,
        email: u.email,
        photo: `users/${menIds[index]}/avatar/${womanPhotos.readDir(true)[index]}`,
        reviews: [],
        tours: [],
        role: 'user',
        active: true,
        speaks: [ 'English' ],
        password: '$2b$12$3WeOSwigC2ADLbw.boW62eD52Xr2JZRNk3OyHtp1v6kObsFgHwFNa'.slice(0, menIds[index].length) + menIds[index]
    }))

const totalUsers = [...men, ...women].sort((a, b) => a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1)

console.log(totalUsers)
fs.writeFileSync('data/users/users.json', JSON.stringify(totalUsers))

//\\//\\ GENERATE IDS FOR YOUR NEED \\//\\//
// const genIds = new GenerateIds(undefined, 6);
// fs.writeFileSync('reviewIds.json', JSON.stringify(genIds.generateIds(2000)))