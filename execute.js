const mongoose = require('mongoose');
const { mongoURI } = require('./config');
const { Tour, Start, User, Review, Order, Conversation, Message } = require('./models');
const { importUsers } = require('./tools/db')
const GenerateIds = require('./idGenerator');
const fs = require('fs');
const Photo = require('./photo');
const { awsOptions } = require('./config')

const { totalUsers } = require('./user');
// const { totalReviews } = require('./review')
const { totalTours } = require('./tour')
// const { totalStarts } = require('./start')


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => console.log('DB connected...'))
    .then(_ => {
        // Start.deleteMany().then(_ => console.log('deleted all'))
        // Order.deleteMany().then(_ => console.log('deleted all'))
        // Message.deleteMany().then(_ => console.log('deleted all'))
        // Conversation.deleteMany().then(_ => console.log('deleted all'))
        ///////////////////////////
        // IMPORT DATA
        // let exReviews = JSON.parse(fs.readFileSync('data/reviews/exReviews.json', 'utf8'));
        // importUsers(Review, exReviews)
        //     .then(() => {
        //     console.log('Import Done!')
        //     process.exit();
        // })
        //     .catch(e => { console.log('Import error',e ); process.exit()});
    })
    .catch(e => console.log(e))

// console.log(totalUsers)
// console.log(totalReviews)
// console.log(totalTours)
// console.log(totalStarts)


//\\//\\ GENERATE IDS FOR YOUR NEED \\//\\//
// const genIds = new GenerateIds(undefined, 6);
// fs.writeFileSync('data/starts/startIds.json', JSON.stringify(genIds.generateIds(4000)))

// process.exit();