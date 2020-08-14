// const mongoose = require('mongoose');
// const { mongoURI } = require('./config');
// const { Tour, Start, User, Review } = require('./models');
// const { importUsers } = require('./tools/db')
// const GenerateIds = require('./idGenerator');
const fs = require('fs');
const wiki = require('wikijs').default;

// const { totalUsers } = require('./user');
// const { totalReviews } = require('./review')
// const { totalTours } = require('./tour')
// const { totalStarts } = require('./start')


// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
// }).then(() => console.log('DB connected...')).catch(e => console.log(e))

// console.log(totalUsers)
// console.log(totalReviews)
// console.log(totalTours)
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
// fs.writeFileSync('data/starts/startIds.json', JSON.stringify(genIds.generateIds(2000)))

// process.exit();

const locations = JSON.parse(fs.readFileSync('data/locations/locations.json', 'utf8'))
// const locs = locations.map(loc => {
//     return loc.data.map(l => l.place_name)
// })
// console.log(locs)

async function locConfig() {

}

async function getShortWiki(keyword) {
    // const phraseEnd = /\.\s[A-Z]/g;
    const newLine = /.*\n/g;
    const parRemove = /\s?\(([^)]+)\)/g;
    const nestedParRemove = /\s?\([^()]*\(([^)]+)\)([^)]+)\)/g;

    let loc = await wiki().page(keyword);
    let text = await loc.summary();

    const nestedPar = text.match(nestedParRemove);
    const par = text.match(parRemove);

    if (nestedPar) text = await text.replace(nestedPar[0], '');
    if (par) await par.forEach(par => text = text.replace(par, ''));

    const firstPart = text.match(newLine);
    if (firstPart) text = firstPart[0].replace('\n', '');

    return text
}



getShortWiki().then(console.log).catch(console.log)

// fs.writeFileSync()