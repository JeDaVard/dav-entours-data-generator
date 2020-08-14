const fs = require('fs');

const { totalUsers } = require('./user');
const users = [...totalUsers];

const reviewText = JSON.parse(fs.readFileSync('data/reviews/text.json', 'utf8'));

const randomRating = [3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5]

const reviewIds = JSON.parse(fs.readFileSync('data/reviews/reviewIds.json', 'utf8'));
const totalReviews = reviewIds.map(({_id, tourAuthor, tour}) => {
    return {
        _id,
        rating: randomRating[Math.floor(Math.random() * 9)],
        author: users.find(u => u.reviews.includes(_id))._id,
        tourAuthor,
        tour,
        review: reviewText[Math.floor(Math.random() * reviewText.length)]
    }
})

fs.writeFileSync('data/reviews/reviews.json', JSON.stringify(totalReviews))

module.exports = {
    totalReviews
}