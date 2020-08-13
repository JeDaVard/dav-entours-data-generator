const GenerateIds = require('./idGenerator');
const fs = require('fs');
// const { totalUsers } = require('./user');


// console.log(totalUsers)

const { totalReviews } = require('./review')


///////////////////////////

// let users = JSON.parse(fs.readFileSync('data/users/users.json', 'utf8'));

// console.log(users)

//\\//\\ GENERATE IDS FOR YOUR NEED \\//\\//
// const genIds = new GenerateIds(undefined, 6);
// fs.writeFileSync('data/reviews/reviewIds.json', JSON.stringify(genIds.generateIds(10000)))