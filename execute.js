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
        // let starts = JSON.parse(fs.readFileSync('data/starts/starts.json', 'utf8'));
        //
        // importUsers(Start, starts)
        //     .then(() => {
        //     console.log('Import Done!')
        //     process.exit();
        // })
        //     .catch(e => { console.log('Import error',e ); process.exit()});


        // return User.findOne({_id: '5f3239cfb642804b75c676d9'})

        // async function f() {
        //     const tour = await Tour.findOne({slug: '3024d1-savannah-experience-start-georgia-discovery'})
        //     const starts = await Start.find({tour: tour._id})
        //     console.log(starts.map(s => s.participants))
        //     console.log(starts.length)
        // }
        // f()
        // let reviews = JSON.parse(fs.readFileSync('data/reviews/reviews.json', 'utf8'));
        //
        // importUsers(Review, reviews).then(() => {
        //     console.log('Import Done!')
        //     process.exit();
        // }).catch(e => { console.log('Import error',e ); process.exit()});
    })
    // .then(console.log)
    // .then(_ => process.exit())
    .catch(e => console.log(e))

// console.log(totalUsers)
// console.log(totalReviews)
// console.log(totalTours)
// console.log(totalStarts)


//\\//\\ GENERATE IDS FOR YOUR NEED \\//\\//
// const genIds = new GenerateIds(undefined, 6);
// fs.writeFileSync('data/starts/startIds.json', JSON.stringify(genIds.generateIds(4000)))

// process.exit();