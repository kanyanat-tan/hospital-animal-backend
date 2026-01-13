exports.create = async (data, repo, pool) => {
    const result = await repo.insertPackageMap(data, pool)
    return result
}

exports.createPackageBooking = async (data, repo, pool) => {
    const result = await repo.insertPackageBooking(data, pool)
    return result
}

exports.updatePackageBooking = async (data, id, repo, pool) => {
    const result = await repo.updatePackageBooking(data, id, pool)
    return result
}