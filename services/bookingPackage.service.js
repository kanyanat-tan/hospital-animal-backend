exports.create = async (data, repo, pool) => {
    const result = await repo.insertBookingPackage(data, pool)
    return result;
}

exports.update = async (data, id, repo, pool) => {
    const result = await repo.updateBookingPackage(data, id, pool)
    return result;
}