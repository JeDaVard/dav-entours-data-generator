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
            role: 'user',
            active: true,
            speaks: [ 'English' ],
            password: '$2b$12$3WeOSwigC2ADLbw.boW62eD52Xr2JZRNk3OyHtp1v6kObsFgHwFNa'.slice(0, ids[index].length) + ids[index]
        }))
}

module.exports = {
    userGen
}