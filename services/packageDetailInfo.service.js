exports.create = async (data, repo, pool) => {
    const result = await repo.insertPackageDetailInfo(data, pool)

    return result
}

exports.update = async (data, id, repo, pool) => {
    const result = await repo.updatePackageDetailInfo(data, id, pool)

    return result
}