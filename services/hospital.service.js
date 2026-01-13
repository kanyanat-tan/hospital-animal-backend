exports.create = async (data, repo, pool) => {
    const result = await repo.insertHospital(data, pool)
    return result
}

exports.update = async (data, repo, id, pool) => {
    const result = await repo.updateHospital(data, id, pool)
    return result
}