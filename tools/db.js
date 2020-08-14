async function importUsers(Model, data) {
    try {
        await Model.create(data)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    importUsers
}