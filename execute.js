// const mongoose = require('mongoose');
// const { mongoURI } = require('./config');
// const { Tour, Start, User, Review } = require('./models');
// const { importUsers } = require('./tools/db')
// const GenerateIds = require('./idGenerator');
const fs = require('fs');

// const { totalUsers } = require('./user');
// const { totalReviews } = require('./review')
const { totalTours } = require('./tour')
// const { totalStarts } = require('./start')


// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
// }).then(() => console.log('DB connected...')).catch(e => console.log(e))

// console.log(totalUsers)
// console.log(totalReviews)
console.log(totalTours)
// console.log(totalStarts)

///////////////////////////
// IMPORT DATA
// let users = JSON.parse(fs.readFileSync('data/users/users.json', 'utf8'));
//
// importUsers(User, users).then(() => {
//     console.log('Import Done!')
//     process.exit();
// }).catch(e => { console.log('Import error',e ); process.exit()});


//\\//\\ GENERATE IDS FOR YOUR NEED \\//\\//
// const genIds = new GenerateIds(undefined, 6);
// fs.writeFileSync('data/starts/startIds.json', JSON.stringify(genIds.generateIds(4000)))

// process.exit();