exports.create = async (data, repo, pool) => {
    const result = await repo.insertPackageDetail(data, pool)
    return result
}