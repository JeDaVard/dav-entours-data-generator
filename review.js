const fs = require('fs');

const reviewIds = JSON.parse(fs.readFileSync('data/reviews/reviewIds.json', 'utf8'));
const totalReviews = reviewIds.map(_id => {
    return {
        _id
    }
})

fs.writeFileSync('data/reviews/reviews.json', JSON.stringify(totalReviews))