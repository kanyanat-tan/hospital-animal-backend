exports.create = async (data, repo, pool) => {
    const result = await repo.insertPackage(data, pool)

    return result
}

exports.update = async (data, id, repo, pool) => {
    const result = await repo.updatePackage(data, id, pool)

    return result
}