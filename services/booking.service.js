exports.create = async (data, role, userid, repo, pool) => {
    const result = await repo.insertBooking(data, role, userid, pool)
    return result
}

exports.update = async (data, role, userid, id, repo, pool) => {
    const result = await repo.updateBooking(data, role, userid, id, pool)
    return result
}